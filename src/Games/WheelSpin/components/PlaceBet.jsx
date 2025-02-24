import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSubscription } from "@apollo/client";
import {
  placeBetAndParticipate,
  betPlaced,
  getBets,
  getParticipants,
  playerParticipated,
  setGames,
  setCurrentGame,
  setEnteredPlayers,
  setPlayer,
  setParticipants,
  setBets,
  setNetworkStatus,
  resetParticipants,
  resetBets,
} from "../../../Config/redux/slices/betsSlice";

function PlaceBet() {
  const dispatch = useDispatch();
  const [betPlaced, setBetPlaced] = useState(false);
  const { gameState, betAmount, totalPlayerRounds, currency, isPlacingBet } =
    useSelector((state) => state.wheelSpin);
  const { gameId, player, networkStatus } = useSelector((state) => state.bets);
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

  // return (
  //   <button
  //     className="btn btn-primary w-100 rounded py-2"
  //     onClick={handlePlaceBet}
  //     disabled={betPlaced || networkStatus.loading}
  //   >
  //     {networkStatus.loading
  //       ? "Processing..."
  //       : betPlaced
  //       ? "Bet Placed"
  //       : "Place Bet"}
  //   </button>
  // );
}

export default PlaceBet;
