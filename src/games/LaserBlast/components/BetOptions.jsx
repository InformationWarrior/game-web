import React from "react";
import "../styles/BetOptions.css";
import CreditsManager from "../scripts/CreditsManager";
import laserBlastLogo from "../assets/thumbnail.webp";
// import { ConnectButton } from "@rainbow-me/rainbowkit"; To be used later.

const BetOptions = ({
  risk,
  row,
  shots,
  onRiskChange,
  onRowChange,
  onShotsChange,
  handleDropBall,
}) => {
  const handleRiskChange = (event) => {
    const value = parseInt(event.target.value, 10);
    const riskLevels = ["low", "medium", "high"];
    const currentRisk = riskLevels[value];
    if (onRiskChange) {
      onRiskChange(currentRisk);
    }
  };

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const handleRowChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (onRowChange) {
      onRowChange(value);
    }
  };

  const handleShotsChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (onShotsChange) {
      onShotsChange(value);
    }
  };

  return (
    <div className="laser-blast__bet-panel">
      <div className="laser-blast__bet-container">
        <div className="laser-blast__bet-main">
          {/* Logo Section */}
          <div className="laser-blast__bet-logo">
            <img src={laserBlastLogo} alt="LaserBlast Logo" />
          </div>

          {/* Entry Section */}
          <div className="laser-blast__bet-entry">
            <label htmlFor="entry-input" className="laser-blast__label">
              Entry
            </label>
            <div className="laser-blast__entry-input-container">
              <input
                id="entry-input"
                className="laser-blast__entry-input"
                placeholder="0.01"
              />
              <div className="laser-blast__currency-select">
                <div className="laser-blast__currency-select">
                  <span>YOLO</span>
                  <i className="laser-blast__dropdown-icon">▼</i>
                </div>
              </div>
            </div>
            <div className="laser-blast__entry-buttons">
              <button>½</button>
              <button>x2</button>
              <button>Max</button>
            </div>
            <div className="laser-blast__entry-note">
              Minimum Play Amount:{" "}
              <span className="laser-blast__entry-min">32.38926</span>
            </div>
          </div>

          {/* Risk Level Section */}
          <div className="laser-blast__bet-risk">
            <label className="laser-blast__label" htmlFor="risk-slider">
              Risk Level
            </label>
            <div className="laser-blast__slider">
              <span className="laser-blast__slider-label">
                {capitalize(risk)}
              </span>
              <input
                type="range"
                id="risk-slider"
                className="laser-blast__range-input"
                min={0}
                max={2}
                step={1}
                value={["low", "medium", "high"].indexOf(risk)}
                onChange={handleRiskChange}
              />
            </div>
          </div>

          {/* Rows Section */}
          <div className="laser-blast__bet-rows">
            <label className="laser-blast__label" htmlFor="row-slider">
              Rows
            </label>
            <div className="laser-blast__slider">
              <span className="laser-blast__slider-label">{row}</span>
              <input
                type="range"
                id="row-slider"
                className="laser-blast__range-input"
                min={8}
                max={16}
                value={row}
                onChange={handleRowChange}
              />
            </div>
          </div>

          {/* Shots Section */}
          <div className="laser-blast__bet-shots">
            <label className="laser-blast__label" htmlFor="shots-slider">
              Shots
            </label>
            <div className="laser-blast__slider">
              <span className="laser-blast__slider-label">{shots}</span>
              <input
                type="range"
                id="shots-slider"
                className="laser-blast__range-input"
                min={1}
                max={10}
                step={1}
                value={shots}
                onChange={handleShotsChange}
              />
            </div>
          </div>
        </div>

        {/* Connect Wallet Button */}
        <div className="laser-blast__bet-connect">
          <button className="laser-blast__connect-btn" onClick={handleDropBall}>
            Drop ball
          </button>
        </div>
      </div>
    </div>
  );
};

export default BetOptions;
