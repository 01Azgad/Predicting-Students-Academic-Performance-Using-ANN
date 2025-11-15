// --- Shared type for the form's state ---
export interface IFormData {
  Gender: string;
  Age: number;
  Department: string;
  'Attendance (%)': number;
  Midterm_Score: number;
  Final_Score: number;
  Assignments_Avg: number;
  Quizzes_Avg: number;
  Participation_Score: number;
  Projects_Score: number;
  Study_Hours_per_Week: number;
  Extracurricular_Activities: string;
  Internet_Access_at_Home: string;
  Parent_Education_Level: string;
  Family_Income_Level: string;
  'Stress_Level (1-10)': number;
  Sleep_Hours_per_Night: number;
}

// --- Shared types for the prediction state ---

// The structure of the data returned by our API
export interface PredictionResponse {
  prediction: 0 | 1;
  probability: number;
}

// The data we'll store in our 'success' state
export interface PredictionData extends PredictionResponse {
  factors: {
    feature: string;
    importance: number;
  }[];
}

// The possible states of our prediction UI
export type PredictionStatus = 'idle' | 'loading' | 'success' | 'error';

// The complete state object for our prediction
export interface IPredictionState {
  status: PredictionStatus;
  data: PredictionData | null;
  error: string | null;
}