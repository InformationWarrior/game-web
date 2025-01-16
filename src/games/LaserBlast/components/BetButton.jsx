import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setServerOutcome, setWallet } from "../../../redux/slices/laserBlastSlice";

function BetButton({ handleDropBall }) {
  const dispatch = useDispatch();
  const { riskLevel, numberOfRows, currency, betAmount, wallet } = useSelector(
    (state) => state.laserBlast
  );

  const handleBetClick = async () => {
    const currentBalance = wallet?.remainingCredits || 0;

    // Check if the wallet has enough balance
    if (currentBalance < betAmount) {
      alert("Insufficient balance!");
      return;
    }

    // Immediately update the wallet balance on the client side
    const updatedBalance = currentBalance - betAmount;
    dispatch(setWallet({ remainingCredits: updatedBalance, currency }));

    try {
      // Send the updated wallet balance and bet details to the server
      const response = await fetch(
        "http://localhost:3001/api/laser-blast/game-outcome",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            rows: numberOfRows,
            risk: riskLevel,
            currency,
            betAmount,
            remainingCredits: updatedBalance,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      // Handle the server response
      const responseData = await response.json();
      const { reward, point } = responseData;

      // Update the Redux store with the server's response
      dispatch(setServerOutcome(responseData));

      // Trigger the ball drop animation with the reward
      handleDropBall(point, reward);
    } catch (error) {
      console.error("Error during Bet button click:", error);

      // Revert the wallet balance on error
      dispatch(setWallet({ remainingCredits: currentBalance, currency }));
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
