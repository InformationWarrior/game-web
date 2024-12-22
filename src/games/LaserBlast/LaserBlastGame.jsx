import React from "react";
import BetOptionPanel from "./components/BetOptionPanel";
import "./styles/LaserBlastGame.css";

function LaserBlastGame(props) {
  return (
    <div className="laserblast-container">
      <div className="game-layout">
        <div className="game-screen">
          <div className="gameplay-area"></div>
        </div>

        <div className="bet-options-panel">
          <BetOptionPanel />
        </div>
      </div>
    </div>
  );
}

export default LaserBlastGame;
