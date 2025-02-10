import React from "react";
import "../styles/Home.css";
import { SiFireship } from "react-icons/si";
import { ImStatsBars } from "react-icons/im";
import gamesConfig from "../../Config/routes/gamesConfig";
import banner from "../assets/Banner.jpeg";
import GameCard from "../components/GameCard"; // Import GameCard

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="banner">
        <img src={banner} alt="Banner" />
      </div>
      {/* Header */}
      <header className="homepage-header">
        <span>BETS GAMES</span>
      </header>

      {/* Popular Games */}
      <section>
        {gamesConfig.map((game, index) => (
          <GameCard
            key={index}
            title={game.title}
            description={game.description}
            imgSrc={game.imgSrc}
            path={game.path}
            gameId={game.id}
          />
        ))}
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
        <div className=" table-responsive wins-table">
          <table className="table table-dark  table-hover">
            <thead>
              <tr>
                <th>Game</th>
                <th>Player</th>
                <th>Entry Amount</th>
                <th>Amount Won</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(8)].map((_, i) => (
                <tr key={i}>
                  <td>Pocket Pachinko</td>
                  <td>Player{i + 1}</td>
                  <td>0.01 ETH</td>
                  <td className="win-amount">0.1 ETH</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
