import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setGameState,
  setInGameMessage,
} from "../../../Common/redux/slices/wheelSpinSlice";

const AnotherTimerComponent = () => {
  const dispatch = useDispatch();
  const { inGameMessage } = useSelector((state) => state.wheelSpin);

  const [timer, setTimer] = useState("00:00");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    if (inGameMessage === "Ready to spin again!") {
      handleSpinClick()
    }
  }, [inGameMessage])

  // Start the SPINNING state and subsequent 10-second timer
  const handleSpinClick = () => {
    setIsButtonDisabled(true);
    setIsSpinning(true); // Show spinner
    dispatch(setGameState("SPINNING"));
    dispatch(setInGameMessage("The wheel is spinning... Good luck!"));

    // SPINNING state lasts for 4 seconds
    setTimeout(() => {
      setIsSpinning(false); // Hide spinner after spinning
      startCountdown(10); // Start 10-second countdown
    }, 4000);
  };

  // Start a countdown timer for the given duration
  const startCountdown = (duration) => {
    let secondsRemaining = duration;

    const interval = setInterval(() => {
      const minutes = Math.floor(secondsRemaining / 60);
      const seconds = secondsRemaining % 60;

      // Update the timer display
      setTimer(
        `${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`
      );
      secondsRemaining--;

      if (secondsRemaining < 0) {
        clearInterval(interval);
        setIsButtonDisabled(false); // Enable the button after countdown
        setTimer("00:00");
        dispatch(setInGameMessage("Ready to spin again!"));
      }
    }, 1000);
  };

  // Render the timer display or spinner
  const renderTimerDisplay = () => {
    if (isSpinning) {
      return (
        <div className="spinner-grow text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      );
    }

    return timer;
  };

  return (
    <div
      className="timer-container d-flex justify-content-center align-items-center"
      style={{
        gap: "5px", // Space between the timer and the button
      }}
    >
      {/* Timer Display */}
      <div
        className="timer-display bg-secondary px-2 py-1 rounded"
        style={{
          width: "80px", // Reduced width
          height: "40px", // Reduced height
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.2rem", // Smaller font size
        }}
      >
        {renderTimerDisplay()}
      </div>

      {/* Spin Button */}
      <button
        className={`btn btn-primary`}
        onClick={handleSpinClick}
        disabled={isButtonDisabled}
        style={{
          width: "80px", // Reduced width
          height: "40px", // Reduced height
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1rem", // Smaller font size
        }}
      >
        Spin
      </button>
    </div>
  );
};

export default AnotherTimerComponent;
