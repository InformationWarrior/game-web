import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setServerOutcome,
  setCredits,
} from "../../../Common/redux/slices/pachinkoSlice";

function BetButton({ handleDropBall }) {
  const dispatch = useDispatch();
  const { riskLevel, numberOfRows, currency, betAmount, credits } = useSelector(
    (state) => state.laserBlast
  );

  const handleBetClick = async () => {
    // Locally decrease credits immediately
    const updatedCredits = credits - betAmount;
    if (updatedCredits < 0) {
      alert("Insufficient credits for this bet.");
      return;
    }

    dispatch(setCredits({ credits: updatedCredits, currency }));

    try {
      const response = await axios.post(
        "http://localhost:3001/api/laser-blast/game-outcome",
        {
          rows: numberOfRows,
          risk: riskLevel,
          currency,
          betAmount,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = response.data;
      const { point, payout } = responseData;

      dispatch(setServerOutcome(responseData));

      // Update credits with payout adjustment
      // const finalCredits = updatedCredits + payout;
      // dispatch(setCredits({ remainingCredits: finalCredits, currency }));

      // Drop the ball in the game
      handleDropBall(point, payout);
    } catch (error) {
      console.error("Error during Bet button click:", error);

      // Roll back the credit deduction in case of API failure
      // dispatch(setCredits({ credits: credits, currency }));

      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <button className="laser-blast__connect-btn" onClick={handleBetClick}>
      Bet
    </button>
  );
}

export default BetButton;
