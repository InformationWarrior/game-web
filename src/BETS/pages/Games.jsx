import React from "react";
import { Link } from "react-router-dom";
import "../styles/GamesPanel.css";
import gameConfig from "../../Config/routes/gamesConfig";

function Games() {
  return (
    <div>
      <h2>Games</h2>
      <div>
        <div className="games-grid">
          {gameConfig.map((game, index) => (
            <Link
              key={index}
              to={game.path}
              rel="noopener noreferrer"
              className="game-card-link"
            >
              <div className="game-card">
                <div
                  className="game-image"
                  style={{ backgroundImage: `url(${game.imgSrc})` }}
                ></div>
                <div className="game-info">
                  <h3>{game.title}</h3>
                  <p>{game.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Games;
