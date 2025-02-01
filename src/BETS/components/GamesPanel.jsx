// import React from "react";
// import { Link } from "react-router-dom";
// import "../styles/GamesPanel.css";
// import gamesConfig from "../../Common/routes/routesConfig";
// import GameCard from "./GameCard";

// function GamesPanel({ setShowGamePanel }) {
//   const handleGameSelect = () => {
//     setShowGamePanel(false);
//   };

//   return (
//     <div className="games-panel">
//       <h2 className="games-header">Games</h2>

//       <div className="games-section">
//         <h3>Single Player</h3>
//         <ul>
//           {gamesConfig.map((game, index) => (
//             <li key={index}>
//               <Link
//                 to={game.path}
//                 className="game-link"
//                 onClick={handleGameSelect}
//               >
//                 <GameCard
//                   title={game.title}
//                   description={game.description}
//                   imgSrc={game.imgSrc}
//                 />
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default GamesPanel;
