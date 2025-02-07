import React, { useEffect } from "react";
import { useSubscription } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { GAME_STATUS_SUBSCRIPTION } from "../../../NetworkManager/graphql/modules/WheelSpin/subscriptions";
import {
  updateGameState,
  decrementTimer,
} from "../../../Config/redux/slices/wheelSpinSlice";

const Timer = (props) => {
  const dispatch = useDispatch();

  // Extract game state and remaining time from Redux
  const { gameState, remainingTime } = useSelector((state) => state.wheelSpin);

  // Debugging component re-renders
  console.log("🎮 Component Render:", gameState, remainingTime);

  // ✅ Listen for game state updates from the server
  const { data, loading, error } = useSubscription(GAME_STATUS_SUBSCRIPTION);

  // Using useEffect to handle subscription data
  useEffect(() => {
    if (data?.gameStatusUpdated) {
      console.log("📢 onData Triggered:", data.gameStatusUpdated);

      // Dispatch action to update game state and remaining time in Redux
      dispatch(
        updateGameState({
          gameState: data.gameStatusUpdated.gameState,
          remainingTime: data.gameStatusUpdated.remainingTime,
        })
      );
    }
  }, [data, dispatch]); // Runs whenever `data` changes from subscription

  // ✅ Start a local countdown timer when remainingTime > 0
  useEffect(() => {
    if (remainingTime > 0) {
      console.log("⏳ Timer Started:", remainingTime); // Debugging
      const interval = setInterval(() => {
        dispatch(decrementTimer());
      }, 1000);
      return () => clearInterval(interval); // Clean up interval on component unmount
    }
  }, [remainingTime, dispatch]); // Runs whenever `remainingTime` changes

  // Show loading or error states if needed
  if (loading) return <p>Loading game state...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = secs < 10 ? `0${secs}` : secs;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  // Helper functions to render different timer displays
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

  // Render timer display based on game state
  const renderTimerDisplay = () => {
    if (gameState === "RESET" || gameState === "END") {
      return renderLoadingSpinner();
    } else if (gameState === "BETTING") {
      return <div className="timer-text">{formatTime(remainingTime)}</div>;
    } else if (gameState === "RUNNING") {
      return renderSpinningLoader();
    } else {
      return null;
    }
  };

  return (
    <div className="timer-container text-white">
      <div
        //className="timer-display bg-secondary px-3 py-2 rounded text-center"
        className={props.className}
        // style={{ width: "80px" }}
      >
        {renderTimerDisplay()}
      </div>
    </div>
  );
};

export default Timer;
