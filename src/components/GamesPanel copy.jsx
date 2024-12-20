import React from "react";
import "../styles/GamesPanel.css";

function GamesPanel() {
  return (
    <div className="games-panel">
      <h2 className="games-header">Games</h2>

      {/* Multiplayer Section */}
      <div className="games-section">
        <h3>Multiplayer</h3>
        <div className="game-item">
          <div className="game-info">
            <h4>YOLO</h4>
            <p>Spin to win!</p>
          </div>
          <img
            src="/assets/gameIcons/yolo.png"
            alt="YOLO"
            className="game-icon"
          />
        </div>

        <div className="game-item">
          <div className="game-info">
            <h4>YOLO Limited</h4>
          </div>
          <span className="new-badge">NEW</span>
        </div>

        <div className="game-item">
          <div className="game-info">
            <h4>Poke the Bear</h4>
            <p>If you dare!</p>
          </div>
          <img
            src="/assets/gameIcons/pokeBear.png"
            alt="Poke the Bear"
            className="game-icon"
          />
        </div>

        <div className="game-item">
          <div className="game-info">
            <h4>MOON or DOOM</h4>
            <p>Predict the future!</p>
          </div>
          <img
            src="/assets/gameIcons/moonDoom.png"
            alt="MOON or DOOM"
            className="game-icon"
          />
        </div>
      </div>

      {/* Single Player Section */}
      <div className="games-section">
        <h3>Single Player</h3>
        <div className="game-item">
          <div className="game-info">
            <h4>Flipper</h4>
            <p>Pick your side...</p>
          </div>
          <img
            src="/assets/gameIcons/flipper.png"
            alt="Flipper"
            className="game-icon"
          />
        </div>

        <div className="game-item">
          <div className="game-info">
            <h4>Quantum</h4>
            <p>Over or under?</p>
          </div>
          <img
            src="/assets/gameIcons/quantum.png"
            alt="Quantum"
            className="game-icon"
          />
        </div>

        <div className="game-item">
          <div className="game-info">
            <h4>LaserBlast</h4>
            <p>Invaders must die.</p>
          </div>
          <img
            src="/assets/gameIcons/laserBlast.png"
            alt="LaserBlast"
            className="game-icon"
          />
        </div>
      </div>
    </div>
  );
}

export default GamesPanel;
