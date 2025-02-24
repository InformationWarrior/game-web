import React from "react";
import gamesConfig from "../../Config/routes/gamesConfig";
import GameCard from "../components/GameCard";
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

// import React from "react";
// import gamesConfig from "../../Config/routes/gamesConfig";
// import GameCard from "../components/GameCard";
// import styles from "../../styles/BETS/Games.module.css";
// import { useSelector } from "react-redux";

// function Games() {
//   const gameList = useSelector((state) => state.bets.games);
//   return (
//     <div className={styles.gamesGrid}>
//        {gameList.map((game, index) => (
//         <GameCard
//           key={index}
//           title={game.title}
//           description={game.description}
//           imgSrc={game.imgSrc}
//           path={game.path}
//           gameId={game.id}
//         />
//       ))}
//     </div>
//   );
// }

// export default Games;
