// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import {
//   setGameState,
//   setInGameMessage,
// } from "../../../Common/redux/slices/wheelSpinSlice";

// const durations = {
//   START: 2,
//   BETTING: 2,
//   SPINNING: 10,
//   RESET: 2,
// };

// const TimerComponent = () => {
//   const dispatch = useDispatch();

//   const [timer, setTimer] = useState("00:00");
//   const [enabledButton, setEnabledButton] = useState("START");

//   // Start the timer for a given game state
//   const startTimer = (gameState) => {
//     const duration = durations[gameState];
//     let secondsRemaining = duration;

//     const interval = setInterval(() => {
//       const minutes = Math.floor(secondsRemaining / 60);
//       const seconds = secondsRemaining % 60;

//       // Set the timer display
//       setTimer(
//         `${minutes.toString().padStart(2, "0")}:${seconds
//           .toString()
//           .padStart(2, "0")}`
//       );
//       secondsRemaining--;

//       // Handle the end of the timer
//       if (secondsRemaining < 0) {
//         clearInterval(interval);
//         handleStateTransition(gameState);
//       }
//     }, 1000);
//   };

//   // Handle game state transitions
//   const handleStateTransition = (gameState) => {
//     switch (gameState) {
//       case "START":
//         dispatch(setGameState("BETTING"));
//         setEnabledButton("BETTING");
//         dispatch(setInGameMessage("Betting is now open! Place your bets."));
//         break;

//       case "BETTING":
//         dispatch(setGameState("SPINNING"));
//         setEnabledButton("SPINNING");
//         dispatch(setInGameMessage("The wheel is spinning... Good luck!"));
//         break;

//       case "SPINNING":
//         dispatch(setGameState("RESET"));
//         setEnabledButton("RESET");
//         break;

//       case "RESET":
//         dispatch(setGameState("START"));
//         setEnabledButton("START");
//         dispatch(setInGameMessage("Start Round."));
//         break;

//       default:
//         console.error(`Unknown game state: ${gameState}`);
//     }
//   };

//   // Automatically start the SPINNING timer
//   useEffect(() => {
//     if (enabledButton === "SPINNING") {
//       startTimer("SPINNING");
//     }
//   }, [enabledButton]);

//   // Handle button click to start timers
//   const handleButtonClick = (gameState) => {
//     startTimer(gameState);
//   };

//   // Render buttons
//   const renderButtons = () => {
//     return ["START", "BETTING", "SPINNING", "RESET"].map((gameState) => (
//       <button
//         key={gameState}
//         className={`btn ${
//           gameState === enabledButton ? "btn-primary" : "btn-secondary"
//         } m-2`}
//         onClick={() => handleButtonClick(gameState)}
//         disabled={gameState !== enabledButton || gameState === "SPINNING"}
//       >
//         {gameState}
//       </button>
//     ));
//   };

//   // Render the timer display
//   const renderTimerDisplay = () => {
//     if (enabledButton === "SPINNING") {
//       return (
//         <div
//           className="spinner-grow text-light"
//           // style={{ width: "3rem", height: "3rem" }}
//           role="status"
//         >
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       );
//     }

//     return timer;
//   };

//   return (
//     <div className="timer-container text-center text-white">
//       <div className="timer-display bg-secondary px-3 py-2 rounded mb-4">
//         {renderTimerDisplay()}
//       </div>
//       <div className="button-group">{renderButtons()}</div>
//     </div>
//   );
// };

// export default TimerComponent;
