import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { participateInGame } from "../../../Config/redux/slices/betsSlice";
import { placeBet } from "../../../Config/redux/slices/wheelSpinSlice";

function PlaceBet() {
  const dispatch = useDispatch();
  const [betPlaced, setBetPlaced] = useState(false);

  const { gameState, betAmount, totalPlayerRounds, currency, isPlacingBet } =
    useSelector((state) => state.wheelSpin);
  const gameId = useSelector((state) => state.bets.gameId);
  const walletAddress = useSelector(
    (state) => state.bets.player?.walletAddress
  );
  const joiningGame = useSelector((state) => state.bets.networkStatus.loading);

  useEffect(() => {
    if (gameState === "BETTING" && betPlaced) {
      setBetPlaced(false);
    }
  }, [gameState]);

  const handlePlaceBet = async () => {
    if (gameState !== "BETTING") return;

    try {
      console.log("🔄 Sending participateInGame mutation...");
      await dispatch(participateInGame({ gameId, walletAddress })).unwrap();
      console.log("✅ Player participation mutation successful!");

      const testBetAmount = 50; // ✅ Setting bet amount higher for testing

      console.log("🔄 Placing bet...");
      await dispatch(
        placeBet({
          gameId,
          walletAddress,
          betAmount: testBetAmount,
          totalPlayerRounds,
          currency,
        })
      ).unwrap();
      console.log("✅ Bet placed successfully!");

      setBetPlaced(true);
    } catch (err) {
      console.error("❌ Error in bet placement flow:", err.message);
    }
  };

  return (
    <button
      className="btn btn-primary w-100 rounded py-2"
      onClick={handlePlaceBet}
      disabled={
        gameState !== "BETTING" || betPlaced || joiningGame || isPlacingBet
      }
    >
      {gameState !== "BETTING"
        ? "Round Closed"
        : betPlaced
        ? "Bet Placed"
        : joiningGame || isPlacingBet
        ? "Processing..."
        : "Place Bet"}
    </button>
  );
}

export default PlaceBet;
