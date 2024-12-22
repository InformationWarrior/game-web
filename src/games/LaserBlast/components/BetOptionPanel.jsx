import React from "react";
import "../styles/BetOptionPanel.css";

const BetOptionPanel = () => {
  return (
    <div className="panel-container">
      <div className="logo-section">
        <img
          src="logo-placeholder.png"
          alt="Laser Blast Logo"
          className="logo"
        />
      </div>
      <div className="entry-section">
        <label>Entry</label>
        <div className="entry-input">
          <input type="text" placeholder="0.01" />
          <button>YOLO</button>
        </div>
      </div>
      <div className="adjustments">
        <div className="adjustment-item">
          <label>Risk Level</label>
          <input type="range" min="1" max="5" />
        </div>
        <div className="adjustment-item">
          <label>Rows</label>
          <input type="number" defaultValue="8" />
        </div>
        <div className="adjustment-item">
          <label>Shots</label>
          <input type="number" defaultValue="5" />
        </div>
      </div>
      <button className="connect-wallet">Connect Wallet</button>
    </div>
  );
};

export default BetOptionPanel;
