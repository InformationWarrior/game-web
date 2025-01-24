import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function AddSelection() {
  const { betAmount, totalPlayerRounds, currency } = useSelector(
    (state) => state.wheelSpin
  );

  const handleAddSelection = async () => {
    const payload = {
      betAmount,
      totalPlayerRounds,
      currency,
    };

    try {
      // Replace with your actual API endpoint
      const response = await axios.post("/api/add-selection", payload);

      console.log("Selection added successfully:", response.data);
      alert("Selection added successfully!");
    } catch (error) {
      if (error.response) {
        // Server-side error
        console.error("Error adding selection:", error.response.data.message);
        alert(`Error: ${error.response.data.message}`);
      } else {
        // Network or other error
        console.error("Network error:", error.message);
        alert("Network error. Please try again later.");
      }
    }
  };

  return (
    <button
      className="btn btn-secondary w-100 rounded py-2"
      onClick={handleAddSelection}
    >
      Add Selection
    </button>
  );
}

export default AddSelection;
