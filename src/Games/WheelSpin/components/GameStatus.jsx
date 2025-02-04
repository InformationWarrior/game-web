import React from "react";
import { useSubscription } from "@apollo/client";
import { GAME_STATUS_SUBSCRIPTION } from "../../../NetworkManager/graphql/modules/WheelSpin/subscriptions";

const GameStatus = () => {
  const { data, loading, error } = useSubscription(GAME_STATUS_SUBSCRIPTION);
  console.log(data);
  if (loading) return <h2>⌛ Waiting for game state...</h2>;
  if (error) return <h2>❌ Error: {error.message}</h2>;

  return (
    <div>
      <h2>Game State: {data?.gameStatusUpdated.state}</h2>
      <p>Time Left: {data?.gameStatusUpdated.remainingTime} seconds</p>
    </div>
  );
};

export default GameStatus;
