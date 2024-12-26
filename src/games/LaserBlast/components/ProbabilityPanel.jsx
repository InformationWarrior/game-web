import React from "react";
import "./ProbabilityPanel.css";

const ProbabilityPanel = ({ netGain, chance, multipliers, onMultiplierSelect }) => {
  return (
    <div className="probability-panel">
      <div className="probability-panel__header">
        <div className="probability-panel__stat">
          <span className="probability-panel__label">Net Gain on Win</span>
          <div className="probability-panel__value">
            {netGain.toFixed(2)}
            <span className="probability-panel__currency">G</span>
          </div>
        </div>
        <div className="probability-panel__stat">
          <span className="probability-panel__label">Chance</span>
          <div className="probability-panel__value">{chance.toFixed(4)}%</div>
        </div>
      </div>
      <div className="probability-panel__multipliers">
        {multipliers.map((multiplier, index) => (
          <button
            key={index}
            className={`probability-panel__multiplier ${
              multiplier.selected ? "probability-panel__multiplier--active" : ""
            }`}
            onClick={() => onMultiplierSelect(multiplier.value)}
          >
            {multiplier.value}x
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProbabilityPanel;
