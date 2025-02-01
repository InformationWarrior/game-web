import React from "react";
import "../styles/GameCard.css";

function GameCard(props) {
  return (
    <div className="game-item">
      <div className="game-info">
        <h4>{props.title}</h4>
        <p>{props.description}</p>
      </div>
      <img src={props.imgSrc} alt={props.title} className="game-icon" />
    </div>
  );
}

export default GameCard;
