import React from 'react';

// --- Types for Component Props ---
interface Factor {
  feature: string;
  importance: number;
}

interface KeyFactorsProps {
  factors: Factor[];
  isPass: boolean;
}

export default function KeyFactors({ factors, isPass }: KeyFactorsProps): React.ReactElement {
  return (
    <div className="key-factors">
      <h4>Key Factors in Prediction</h4>
      <ul className="key-factors-list">
        {factors.map((factor) => (
          <li key={factor.feature}>
            <span>{factor.feature}</span>
            <div className="factor-bar-container">
              <div
                className={`factor-bar ${isPass ? 'pass' : 'fail'}`}
                style={{ width: `${factor.importance * 100}%` }}
              ></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}