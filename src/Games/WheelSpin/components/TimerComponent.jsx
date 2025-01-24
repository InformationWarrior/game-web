import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Timer from "../scripts/timer";
import {
  handleStateTransition,
  getDurationForState,
} from "../scripts/gameStateManager";

const TimerComponent = () => {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.wheelSpin.gameState);

  const [time, setTime] = useState("00:00");

  // Start or stop the timer based on the game state
  useEffect(() => {
    if (gameState === "END") {
      handleStateTransition(gameState, dispatch);
      return;
    }

    const timerInstance = new Timer(
      getDurationForState(gameState),
      setTime,
      () => handleStateTransition(gameState, dispatch)
    );

    timerInstance.start();

    return () => timerInstance.stop();
  }, [gameState, dispatch]);

  // Helper function to render timer display based on game state
  const renderTimerDisplay = () => {
    if (gameState === "RESET") {
      return renderLoadingSpinner();
    }

    if (gameState === "STARTING") {
      return <div className="timer-text">{time}</div>;
    }

    if (gameState === "SPINNING") {
      return renderSpinningLoader();
    }

    return null;
  };

  const renderLoadingSpinner = () => (
    <div className="d-flex justify-content-center align-items-center">
      <div
        className="spinner-border"
        style={{ width: "1.5rem", height: "1.5rem" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  const renderSpinningLoader = () => (
    <div className="d-flex justify-content-center align-items-center">
      <div
        className="spinner-grow"
        style={{ width: "1.5rem", height: "1.5rem" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <div className="timer-container text-white">
      <div
        className="timer-display bg-secondary px-3 py-2 rounded text-center"
        style={{ width: "80px" }}
      >
        {renderTimerDisplay()}
      </div>
    </div>
  );
};

export default TimerComponent;
