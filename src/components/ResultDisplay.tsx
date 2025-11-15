import React from 'react';
import { Brain, Loader2, AlertTriangle, CheckCircle } from './Icons';
import KeyFactors from './KeyFactors';
import type { IPredictionState } from '../types'; // Import our prediction state type

// --- Types for Component Props ---
interface ResultDisplayProps {
  prediction: IPredictionState;
}

export default function ResultDisplay({ prediction }: ResultDisplayProps): React.ReactElement {
  const { status, data, error } = prediction;

  switch (status) {
    case 'loading':
      return (
        <div className="result-base result-loading">
          <Loader2 className="icon" />
          <p>Analyzing Student Data...</p>
        </div>
      );

    case 'error':
      return (
        <div className="result-base result-error">
          <AlertTriangle className="icon" />
          <h3>Prediction Failed</h3>
          <p>Could not connect to the model.</p>
          <p className="error-message">{error}</p>
        </div>
      );

    case 'success':
      if (!data) return null; // Should not happen if status is success

      const isPass = data.prediction === 1;
      const confidence = isPass ? data.probability * 100 : (1 - data.probability) * 100;
      const factors = data.factors || [];

      const successClass = isPass ? 'pass' : 'fail';
      
      return (
        <div className={`result-base result-success ${successClass}`}>
          {isPass ? (
            <CheckCircle className={`icon ${successClass}`} />
          ) : (
            <AlertTriangle className={`icon ${successClass}`} />
          )}
          
          <h2 className={`result-title ${successClass}`}>
            {isPass ? 'PASS' : 'AT-RISK'}
          </h2>
          <p className={`result-subtitle ${successClass}`}>
            {isPass ? '(Low-Risk)' : '(High-Risk)'}
          </p>

          <div className="result-confidence">
            <p>Confidence</p>
            <p className={`confidence-score ${successClass}`}>
              {confidence.toFixed(1)}%
            </p>
          </div>

          <KeyFactors factors={factors} isPass={isPass} />
          
        </div>
      );

    case 'idle':
    default:
      return (
        <div className="result-base result-idle">
          <Brain className="icon" />
          <h3>Prediction results will appear here.</h3>
          <p>
            Fill out the form and click "Predict" to see the model's analysis.
          </p>
        </div>
      );
  }
}