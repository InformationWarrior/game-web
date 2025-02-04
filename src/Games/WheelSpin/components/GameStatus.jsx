import React, { useEffect } from "react";
import { useSubscription } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { GAME_STATUS_SUBSCRIPTION } from "../../../NetworkManager/graphql/modules/WheelSpin/subscriptions";
import {
  updateGameState,
  decrementTimer,
} from "../../../Config/redux/slices/wheelSpinSlice";

const GameStatus = () => {
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

  return (
    <div key={gameState + remainingTime}>
      <h2>Game State: {gameState}</h2>
      <p>Time Left: {remainingTime} seconds</p>
    </div>
  );
};

export default GameStatus;
