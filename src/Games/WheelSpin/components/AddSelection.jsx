import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function AddSelection() {
  const { betAmount, totalPlayerRounds, currency, gameState } = useSelector(
    (state) => state.wheelSpin
  );

  const handleAddSelection = async () => {
    const payload = {
      betAmount,
      totalPlayerRounds,
      currency,
    };

    try {
      const response = await axios.post("/api/add-selection", payload);
      console.log("Selection added successfully:", response.data);
      alert("Selection added successfully!");
    } catch (error) {
      if (error.response) {
        console.error("Error adding selection:", error.response.data.message);
        alert(`Error: ${error.response.data.message}`);
      } else {
        console.error("Network error:", error.message);
        alert("Network error. Please try again later.");
      }
    }
  };

  return (
    <button
      className="btn btn-secondary w-100 rounded py-2"
      onClick={handleAddSelection}
      disabled={gameState !== "STARTING"}
    >
      {gameState === "STARTING" ? "Add Selection" : "Round Closed"}
    </button>
  );
}

export default AddSelection;
