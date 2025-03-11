import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { placeBetAndParticipate } from "../../../Config/redux/slices/betsActions";

function PlaceBet() {
  const dispatch = useDispatch();
  const [betPlaced, setBetPlaced] = useState(false);
  const { gameState, betAmount } = useSelector((state) => state.wheelSpin);
  const { gameId, player } = useSelector((state) => state.bets);
  const loading = useSelector((state) => state.bets.networkStatus.loading);

  useEffect(() => {
    if (gameState === "BETTING" && betPlaced) {
      setBetPlaced(false);
    }
  }, [gameState]);

  const handlePlaceBet = async () => {
    if (!gameId || !player.walletAddress) {
      console.error("Game ID or Wallet Address is missing");
      return;
    }

    const amount = betAmount; // Replace with dynamic input
    const currency = "ETH"; // Replace with selected currency

    dispatch(
      placeBetAndParticipate({
        gameId,
        walletAddress: player.walletAddress,
        betAmount: amount,
        currency,
      })
    )
      .unwrap()
      .then(() => {
        setBetPlaced(true);
      })
      .catch((error) => {
        console.error("Bet placement failed:", error);
      });
  };

  return (
    <button
      className="btn btn-primary w-100 rounded py-2"
      onClick={handlePlaceBet}
      disabled={gameState !== "BETTING" || betPlaced || loading}
    >
      {gameState !== "BETTING"
        ? "Round Closed"
        : betPlaced
        ? "Bet Placed"
        : loading
        ? "Processing..."
        : "Place Bet"}
    </button>
  );
}

export default PlaceBet;
