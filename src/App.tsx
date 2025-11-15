import React, { useState } from 'react';

// Import the components
import Header from './components/Header';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';

// Import the CSS file
import './App.css';

// Import our types
import type { IFormData, IPredictionState, PredictionResponse, PredictionData } from './types';

// --- 1. Initial State for the Form (Typed) ---
const initialFormData: IFormData = {
  Gender: 'Female',
  Age: 20,
  Department: 'CS',
  'Attendance (%)': 90,
  Midterm_Score: 85,
  Final_Score: 80, // This is the 'G2' equivalent
  Assignments_Avg: 88,
  Quizzes_Avg: 82,
  Participation_Score: 8,
  Projects_Score: 85,
  Study_Hours_per_Week: 15,
  Extracurricular_Activities: 'Yes',
  Internet_Access_at_Home: 'Yes',
  Parent_Education_Level: "Bachelor's",
  Family_Income_Level: 'Medium',
  'Stress_Level (1-10)': 5,
  Sleep_Hours_per_Night: 7,
};

// --- 2. The Main Application Component ---
export default function App(): React.ReactElement {
  const [formData, setFormData] = useState<IFormData>(initialFormData);
  const [prediction, setPrediction] = useState<IPredictionState>({
    status: 'idle',
    data: null,
    error: null,
  });

  // Type the event handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const updatedValue = type === 'number' ? parseFloat(value) : value;
    
    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  // Type the form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPrediction({ status: 'loading', data: null, error: null });

    const API_URL = 'http://127.0.0.1:5000/predict';

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: PredictionResponse = await response.json();
      
      const mockFactors = [
        { feature: 'Final_Score (G2)', importance: 0.85 },
        { feature: 'Midterm_Score', importance: 0.72 },
        { feature: 'Attendance (%)', importance: 0.55 },
      ];
      
      const predictionData: PredictionData = {
        ...result,
        factors: mockFactors,
      };
      
      setPrediction({ 
        status: 'success', 
        data: predictionData,
        error: null 
      });

    } catch (err) {
      console.error("Prediction error:", err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setPrediction({ status: 'error', data: null, error: errorMessage });
    }
  };

  return (
    <div className="">
      <Header />
      
      {/* --- THIS IS THE UPDATED SECTION --- */}
      <main className="main-stack-layout app-container">
        {/* The form is now first and will take up the full width */}
        <InputForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isLoading={prediction.status === 'loading'}
        />
        {/* The result display is second and will appear right below */}
        <ResultDisplay prediction={prediction} />
      </main>
      {/* --- END OF UPDATED SECTION --- */}
      
    </div>
  );
}