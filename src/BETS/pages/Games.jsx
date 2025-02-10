import React from "react";
import gamesConfig from "../../Config/routes/gamesConfig";
import GameCard from "../components/GameCard"; // Import GameCard
import styles from "../../styles/BETS/Games.module.css";

function Games() {
  return (
    <div className={styles.gamesGrid}>
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
    </div>
  );
}

export default Games;
