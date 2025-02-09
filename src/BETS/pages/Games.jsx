import React from "react";
import { Link } from "react-router-dom";
import "../styles/GamesPanel.css";
import gameConfig from "../../Config/routes/gamesConfig";
import { useDispatch, useSelector } from "react-redux";
import { joinGame } from "../../Config/redux/slices/betsSlice"; // Import action

function Games() {
  const dispatch = useDispatch();
  const walletAddress = useSelector((state) => state.bets.wallet.address); // Get wallet from Redux

  const handleJoinGame = (gameId) => {
    if (!walletAddress) {
      alert("Connect your wallet first!");
      return;
    }
    dispatch(joinGame({ gameId, walletAddress }));
  };

  return (
    <div className="games-grid">
      {gameConfig.map((game, index) => (
        <Link
          key={index}
          to={game.path}
          rel="noopener noreferrer"
          className="game-card-link"
          onClick={() => handleJoinGame("67a89cf55a020728c5b4d746")}
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
  );
}
export default Games;
