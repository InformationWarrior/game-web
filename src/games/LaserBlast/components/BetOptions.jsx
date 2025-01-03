import React, { useState } from "react";
import "../styles/BetOptions.css";
import laserBlastLogo from "../assets/thumbnail.webp";
import { TiArrowSortedDown } from "react-icons/ti";
// import { ConnectButton } from "@rainbow-me/rainbowkit"; To be used later.

const BetOptions = (props) => {
  const {
    risk,
    row,
    onRiskChange,
    onRowChange,
    handleDropBall,
    dropdownOpen,
    setDropdownOpen,
    selectedCurrency,
    handleCurrencyChange,
    currentBet,
    handleLeftClick,
    handleRightClick,
    currentCredits, // Receive current credits
    currentMultiplier,
    totalWin,
    overallTotalWin,
  } = props;

  const handleRiskChange = (event) => {
    const value = parseInt(event.target.value, 10);
    const riskLevels = ["low", "medium", "high"];
    const currentRisk = riskLevels[value];
    if (onRiskChange) {
      onRiskChange(currentRisk);
    }
  };

  const handleRowChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (onRowChange) {
      onRowChange(value);
    }
  };

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <div className="laser-blast__bet-panel">
      <div className="laser-blast__bet-container">
        <div className="laser-blast__bet-main">
          {/* Logo Section */}
          <div className="laser-blast__bet-logo">
            <img src={laserBlastLogo} alt="LaserBlast Logo" />
          </div>

          {/* Reference Bet Section - Delete Later! */}
          <div className="laser-blast__current-bet">
            {/* Display Current Credits */}
            <div className="laser-blast__credits">
              <span className="credits-display">Credits: {currentCredits}</span>
            </div>
            {/* Current Bet Section */}
            <button onClick={handleLeftClick} className="bet-nav-button">
              ◀
            </button>
            <span className="current-bet-display">Bet: {currentBet}</span>
            <button onClick={handleRightClick} className="bet-nav-button">
              ▶
            </button>
            {/* Current Multiplier */}
            <div className="laser-blast__credits">
              <span className="credits-display">
                Multiplier: {currentMultiplier}
              </span>
            </div>
            {/* Total Win */}
            <div className="laser-blast__credits">
              {/* <span className="credits-display">Total Win: {totalWin}</span> */}
              <p>Current Win: {totalWin}</p>
              <p>Overall Total Win: {overallTotalWin}</p>
            </div>
          </div>

          {/* Entry Section */}
          {/* <div className="laser-blast__bet-entry">
            <label htmlFor="entry-input" className="laser-blast__label">
              Entry
            </label>
            <div className="laser-blast__entry-input-container">
              <div className="laser-blast__dropdown-input">
                <input
                  id="entry-input"
                  className="laser-blast__entry-input"
                  placeholder="0.01"
                />
                <div className="laser-blast__dropdown-container">
                  <button
                    className="laser-blast__dropdown-button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {selectedCurrency}
                    <i className="laser-blast__dropdown-icon">
                      <TiArrowSortedDown />
                    </i>
                  </button>
                  {dropdownOpen && (
                    <ul className="laser-blast__dropdown-menu">
                      {["YOLO", "ETH"].map((currency) => (
                        <li
                          key={currency}
                          className="laser-blast__dropdown-item"
                          onClick={() => handleCurrencyChange(currency)}
                        >
                          {currency}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div className="laser-blast__entry-buttons">
              <button>½</button>
              <button>x2</button>
            </div>
          </div> */}

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
          {/* <div className="laser-blast__bet-shots">
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
              />
            </div>
          </div> */}
        </div>

        {/* Connect Wallet Button */}
        <div className="laser-blast__bet-connect">
          <button className="laser-blast__connect-btn" onClick={handleDropBall}>
            Play
          </button>
        </div>
      </div>
    </div>
  );
};

export default BetOptions;
