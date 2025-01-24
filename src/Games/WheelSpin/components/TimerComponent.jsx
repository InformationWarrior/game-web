import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGameState } from "../../../Common/redux/slices/wheelSpinSlice";
import Timer from "../scripts/timer";

const TimerComponent = () => {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.wheelSpin.gameState); // Get game state from Redux

  const [time, setTime] = useState("00:00");
  const [timer, setTimer] = useState(null);

  const durations = {
    RESET: 2, // 15 seconds for Reset state
    STARTING: 2, // 12 seconds for Starting state
    RUNNING: 3, // 93 seconds for Running state
    END: 0, // No timer for End state (transition immediately)
  };

  useEffect(() => {
    if (gameState !== "END") {
      const timerInstance = new Timer(
        durations[gameState],
        (formattedTime) => setTime(formattedTime),
        handleStateTransition // Handle state change on timer complete
      );
      setTimer(timerInstance);
      timerInstance.start();

      // Cleanup timer on unmount or state change
      return () => timerInstance.stop();
    } else {
      handleStateTransition();
    }
  }, [gameState]); // Run whenever gameState changes

  const handleStateTransition = () => {
    // Transition to the next state
    if (gameState === "RESET") {
      dispatch(setGameState("STARTING"));
    } else if (gameState === "STARTING") {
      dispatch(setGameState("RUNNING"));
    } else if (gameState === "RUNNING") {
      dispatch(setGameState("END"));
    } else if (gameState === "END") {
      dispatch(setGameState("RESET"));
    }
  };

  const renderTimerDisplay = () => {
    if (gameState === "RESET") {
      return (
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
    } else if (gameState === "STARTING") {
      return (
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
    } else if (gameState === "RUNNING") {
      return <div className="timer-text">{time}</div>;
    } else {
      return null; // No display for END state
    }
  };

  return (
    <div className="timer-container text-white">
      <div
        className="timer-display bg-secondary px-3 py-2 rounded text-center"
        style={{ width: "80px" }} // Fixed width for consistent display
      >
        {renderTimerDisplay()}
      </div>
    </div>
  );
};

export default TimerComponent;
