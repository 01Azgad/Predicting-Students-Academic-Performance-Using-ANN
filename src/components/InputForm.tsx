import React from 'react';
import { FormSection, FormInput, FormSelect } from './FormComponents';
import { User, BookOpen, Brain, Loader2 } from './Icons';
import type { IFormData } from '../types'; // Import our form data type

// --- Types for Component Props ---
interface InputFormProps {
  formData: IFormData;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function InputForm({ 
  formData, 
  onChange, 
  onSubmit, 
  isLoading 
}: InputFormProps): React.ReactElement {
  return (
    <form 
      onSubmit={onSubmit} 
      className="form-container"
    >
      <div className="form-grid">
        
        {/* --- Demographic Info --- */}
        <FormSection title="Student Info" icon={<User className="icon" />}>
          <FormInput
            label="Age"
            type="number"
            name="Age"
            value={formData.Age}
            onChange={onChange}
            min="15"
            max="30"
          />
          <FormSelect
            label="Gender"
            name="Gender"
            value={formData.Gender}
            onChange={onChange}
          >
            <option>Female</option>
            <option>Male</option>
          </FormSelect>
          <FormSelect
            label="Department"
            name="Department"
            value={formData.Department}
            onChange={onChange}
          >
            <option>CS</option>
            <option>Engineering</option>
            <option>Business</option>
            <option>Mathematics</option>
            <option>Other</option>
          </FormSelect>
        </FormSection>

        {/* --- Academic Info --- */}
        <FormSection title="Academic Scores" icon={<BookOpen className="icon" />}>
          <FormInput
            label="Attendance (%)"
            type="number"
            name="Attendance (%)"
            value={formData['Attendance (%)']}
            onChange={onChange}
            min="0"
            max="100"
          />
          <FormInput
            label="Midterm Score"
            type="number"
            name="Midterm_Score"
            value={formData.Midterm_Score}
            onChange={onChange}
            min="0"
            max="100"
          />
          <FormInput
            label="Final Exam Score (G2)"
            type="number"
            name="Final_Score"
            value={formData.Final_Score}
            onChange={onChange}
            min="0"
            max="100"
          />
          <FormInput
            label="Assignments Avg"
            type="number"
            name="Assignments_Avg"
            value={formData.Assignments_Avg}
            onChange={onChange}
            min="0"
            max="100"
          />
          <FormInput
            label="Quizzes Avg"
            type="number"
            name="Quizzes_Avg"
            value={formData.Quizzes_Avg}
            onChange={onChange}
            min="0"
            max="100"
          />
          <FormInput
            label="Participation (1-10)"
            type="number"
            name="Participation_Score"
            value={formData.Participation_Score}
            onChange={onChange}
            min="0"
            max="10"
          />
          <FormInput
            label="Projects Score"
            type="number"
            name="Projects_Score"
            value={formData.Projects_Score}
            onChange={onChange}
            min="0"
            max="100"
          />
        </FormSection>

        {/* --- Behavioral Info --- */}
        <FormSection title="Habits & Environment" icon={<Brain className="icon" />}>
          <FormInput
            label="Study Hours / Week"
            type="number"
            name="Study_Hours_per_Week"
            value={formData.Study_Hours_per_Week}
            onChange={onChange}
            min="0"
          />
          <FormInput
            label="Stress Level (1-10)"
            type="number"
            name="Stress_Level (1-10)"
            value={formData['Stress_Level (1-10)']}
            onChange={onChange}
            min="1"
            max="10"
          />
          <FormInput
            label="Sleep Hours / Night"
            type="number"
            name="Sleep_Hours_per_Night"
            value={formData.Sleep_Hours_per_Night}
            onChange={onChange}
            min="0"
            max="16"
          />
          <FormSelect
            label="Extracurriculars"
            name="Extracurricular_Activities"
            value={formData.Extracurricular_Activities}
            onChange={onChange}
          >
            <option>No</option>
            <option>Yes</option>
          </FormSelect>
          <FormSelect
            label="Internet at Home"
            name="Internet_Access_at_Home"
            value={formData.Internet_Access_at_Home}
            onChange={onChange}
          >
            <option>No</option>
            <option>Yes</option>
          </FormSelect>
        </FormSection>
        
        {/* --- Family Info --- */}
        <FormSection title="Family Background" icon={<User className="icon" />}>
          <FormSelect
            label="Parent Education"
            name="Parent_Education_Level"
            value={formData.Parent_Education_Level}
            onChange={onChange}
          >
            <option>None</option>
            <option>High School</option>
            <option>Bachelor's</option>
            <option>Master's</option>
            <option>PhD</option>
          </FormSelect>
          <FormSelect
            label="Family Income"
            name="Family_Income_Level"
            value={formData.Family_Income_Level}
            onChange={onChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </FormSelect>
        </FormSection>
      </div>

      {/* --- Submit Button --- */}
      <div className="form-submit-button-container">
        <button
          type="submit"
          disabled={isLoading}
          className="form-submit-button"
        >
          {isLoading ? (
            <Loader2 className="icon loading-spinner" />
          ) : (
            <Brain className="icon" />
          )}
          {isLoading ? 'Analyzing...' : 'Predict Performance'}
        </button>
      </div>
    </form>
  );
}