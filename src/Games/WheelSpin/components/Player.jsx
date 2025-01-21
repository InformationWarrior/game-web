import React from "react";
import "../styles/Player.css";
import { FaEthereum } from "react-icons/fa";

function Player(props) {
  const {
    avatar,
    username,
    points,
    percentage,
    value,
    isWinner,
    borderColorClass,
  } = props;

  return (
    <div className={`player-card ${borderColorClass || "border-green"}`}>
      <div className="player-avatar">
        <img src={avatar} alt={username} />
      </div>
      <div className="player-details">
        <div className="player-username">
          {username} {isWinner && <span className="crown">👑</span>}
        </div>
        <div className="player-points">{points} Pts</div>
      </div>
      <div className="player-stats">
        <div className="player-percentage">{percentage}%</div>
        <div className="player-value">
          {value}{" "}
          <span>
            <FaEthereum />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Player;
