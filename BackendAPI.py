import pandas as pd
import joblib
from tensorflow import keras
from flask import Flask, request, jsonify
from flask_cors import CORS

# --- 1. LOAD MODELS AND DATA ---
print(" * Loading model 'final_ann_model.h5'...")
model = keras.models.load_model('final_ann_model.h5')

print(" * Loading scaler 'final_scaler.joblib'...")
scaler = joblib.load('final_scaler.joblib')

# We must load the original data to know the *exact*
# column order our model was trained on.
print(" * Loading training data columns...")
df = pd.read_csv('Students Performance Dataset.csv')

# This is the same preprocessing function from your Colab notebook
def preprocess_data(df):
    # We only care about the 'X' features here
    X_features = df.drop(columns=[
        'Grade', 'Total_Score',
        'Student_ID', 'First_Name', 'Last_Name', 'Email'
    ])
    X_encoded = pd.get_dummies(X_features, drop_first=True)
    return X_encoded

# Get the list of column names in the exact order
# the model was trained on.
TRAIN_COLUMNS = preprocess_data(df).columns.tolist()
print(f" * Model trained on {len(TRAIN_COLUMNS)} features.")


# --- 2. INITIALIZE FLASK APP ---
app = Flask(__name__)
# This is CRITICAL. It allows your React app (on port 3000)
# to talk to this Python server (on port 5000).
CORS(app) 


# --- 3. DEFINE PREDICTION ENDPOINT ---
@app.route("/predict", methods=["POST"])
def predict():
    try:
        # 1. Get the JSON data from the React form
        data = request.get_json()

        # 2. Convert the single JSON object into a DataFrame
        #    (We use [data] to make it a 1-row DataFrame)
        input_df = pd.DataFrame([data])

        # 3. Preprocess the input data
        #    a. One-hot encode the categorical features
        input_encoded = pd.get_dummies(input_df)
        
        #    b. Align columns: This is the MOST important step.
        #       It adds any missing columns (with 0) and puts them
        #       in the *exact* order the model expects.
        input_aligned = input_encoded.reindex(columns=TRAIN_COLUMNS, fill_value=0)

        #    c. Scale the data
        input_scaled = scaler.transform(input_aligned)

        # 4. Make the prediction
        #    model.predict() returns a 2D array, e.g., [[0.85]]
        probability = model.predict(input_scaled)[0][0]
        prediction = 1 if probability > 0.5 else 0

        # 5. Send the result back to React
        return jsonify({
            "prediction": prediction,
            "probability": float(probability)
        })

    except Exception as e:
        print(f"Error processing request: {e}")
        return jsonify({"error": str(e)}), 500


# --- 4. RUN THE APP ---
if __name__ == "__main__":
    print("Starting Flask server... Go to http://127.0.0.1:5000")
    app.run(port=5000)