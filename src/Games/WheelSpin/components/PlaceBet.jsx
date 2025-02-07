import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { PLACE_BET } from "../../../NetworkManager/graphql/modules/WheelSpin/mutations";

function PlaceBet() {
  const [betPlaced, setBetPlaced] = useState(false);
  const [placeBet, { loading }] = useMutation(PLACE_BET);
  const { betAmount, totalPlayerRounds, currency, gameState } = useSelector(
    (state) => state.wheelSpin
  );

  // Reset betPlaced when a new betting round starts
  useEffect(() => {
    if (gameState === "BETTING" && betPlaced) {
      setBetPlaced(false);
    }
  }, [gameState]);

  const handlePlaceBet = async () => {
    try {
      const { data } = await placeBet({
        variables: {
          betAmount,
          totalPlayerRounds,
          currency,
        },
      });

      if (data.placeBet.success) {
        console.log("Bet placed successfully!");
        setBetPlaced(true);
      } else {
        console.log(`Error: ${data.placeBet.message}`);
        setBetPlaced(false);
      }
    } catch (err) {
      console.error("Error placing bet:", err.message);
    }
  };

  return (
    <button
      className="btn btn-secondary w-100 rounded py-2"
      onClick={handlePlaceBet}
      disabled={gameState !== "BETTING" || betPlaced || loading}
    >
      {gameState !== "BETTING"
        ? "Round Closed"
        : betPlaced
        ? "Bet Placed"
        : "Place Bet"}
    </button>
  );
}

export default PlaceBet;
