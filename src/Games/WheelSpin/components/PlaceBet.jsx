import React from "react";
import { useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { PLACE_BET } from "../../../NetworkManager/graphql/modules/WheelSpin/mutations";

function PlaceBet() {
  const [placeBet, { loading, error }] = useMutation(PLACE_BET);
  const { betAmount, totalPlayerRounds, currency, gameState } = useSelector(
    (state) => state.wheelSpin
  );

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
        alert("Bet placed successfully!");
      } else {
        alert(`Error: ${data.placeBet.message}`);
      }
    } catch (err) {
      console.error("Error placing bet:", err.message);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <button
      className="btn btn-secondary w-100 rounded py-2"
      onClick={handlePlaceBet}
      disabled={gameState !== "BETTING"}
    >
      {gameState === "BETTING" ? "Place Bet" : "Round Closed"}
    </button>
  );
}

export default PlaceBet;
