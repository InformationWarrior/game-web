import React from "react";
import { useGameStatus } from "../../../NetworkManager/hooks/useGameStatus";

const GameStatusDisplay = () => {
  const { gameStatus, loading, error } = useGameStatus();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Game State: {gameStatus.state}</h2>
      <p>Remaining Time: {gameStatus.remainingTime}s</p>
    </div>
  );
};

export default GameStatusDisplay;
