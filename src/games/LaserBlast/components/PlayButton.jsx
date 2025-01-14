import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setServerOutcome } from "../../../redux/slices/laserBlastSlice";

function PlayButton({ handleDropBall }) {
  const dispatch = useDispatch();
  const { riskLevel, numberOfRows } = useSelector((state) => state.laserBlast);

  const handlePlayClick = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/laser-blast/game-outcome",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rows: numberOfRows,
            risk: riskLevel,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const responseData = await response.json();
      dispatch(setServerOutcome(responseData.point)); // Store server outcome
      handleDropBall(responseData.point); // Pass point to the game logic
    } catch (error) {
      console.error("Error during Play button click:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <button className="laser-blast__connect-btn" onClick={handlePlayClick}>
      Play
    </button>
  );
}

export default PlayButton;
