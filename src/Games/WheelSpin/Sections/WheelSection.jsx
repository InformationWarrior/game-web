import React from "react";
import Spinner from "../components/Spinner";

function WheelSection() {
  return (
    <div className="wheel-section-container d-flex flex-column justify-content-center">
      <h4 className="text-white mb-4">Current Round</h4>
      <div className="spinner-container d-flex justify-content-center">
        <Spinner />
      </div>
    </div>
  );
}

export default WheelSection;
