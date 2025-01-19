import React from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import { SiFireship } from "react-icons/si";
import { ImStatsBars } from "react-icons/im";
import { FaGamepad } from "react-icons/fa";
import gameConfigTemporary from "../../Common/routes/gameConfigTemporary";

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Header */}
      <header className="homepage-header">
        <div className="logo">
          <span className="highlight">YOLO</span> GAMES
        </div>
      </header>

      {/* Popular Games Section */}
      <section className="popular-games">
        <h2>
          <FaGamepad /> POPULAR GAMES
        </h2>
        <div className="games-grid">
          {gameConfigTemporary.map((game, index) => (
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
                >
                  <span className="watching">{game.watching} Watching</span>
                </div>
                <div className="game-info">
                  <h3>{game.title}</h3>
                  <p>{game.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Platform Stats */}
      <section className="platform-stats">
        <h2>
          <ImStatsBars /> PLATFORM STATS
        </h2>
        <div className="stats-grid">
          <div className="stat-card">
            <p>Total Players</p>
            <hr />
            <h3>133,166</h3>
          </div>
          <div className="stat-card">
            <p>Total Game Volume</p>
            <hr />
            <h3>657,112 ETH</h3>
          </div>
          <div className="stat-card">
            <p>Total Games Played</p>
            <hr />
            <h3>30,824,135</h3>
          </div>
        </div>
      </section>

      {/* Recent Wins */}
      <section className="recent-wins">
        <h2>
          <SiFireship /> RECENT WINS
        </h2>
        <div className="wins-table">
          <div className="table-header">
            <span>Game</span>
            <span>Player</span>
            <span>Entry Amount</span>
            <span>Amount Won</span>
          </div>
          {[...Array(8)].map((_, i) => (
            <div className="table-row" key={i}>
              <span>Laser Blast</span>
              <span>Player{i + 1}</span>
              <span>0.01 ETH</span>
              <span className="win-amount">0.1 ETH</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
