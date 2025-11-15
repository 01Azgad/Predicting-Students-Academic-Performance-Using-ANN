import React from 'react';

// --- Types for Component Props ---

interface FormSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

// Use built-in React types for input/select elements
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  children: React.ReactNode;
}


// --- Components ---

export function FormSection({ title, icon, children }: FormSectionProps): React.ReactElement {
  return (
    <div className="form-section">
      <h3>
        {icon}
        <span>{title}</span>
      </h3>
      {children}
    </div>
  );
}

export function FormInput({ label, ...props }: FormInputProps): React.ReactElement {
  return (
    <div className="form-input-group">
      <label>{label}</label>
      <input {...props} />
    </div>
  );
}

export function FormSelect({ label, children, ...props }: FormSelectProps): React.ReactElement {
  return (
    <div className="form-select-group">
      <label>{label}</label>
      <select {...props}>
        {children}
      </select>
    </div>
  );
}