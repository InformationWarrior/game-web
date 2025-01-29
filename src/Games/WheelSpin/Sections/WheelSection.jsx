import React from "react";
import SpinningWheel from "../components/SpinningWheel";

function WheelSection() {
  return (
    <div className="wheel-section-container d-flex flex-column justify-content-center">
      <h4 className="text-white mb-4">Current Round</h4>
      <div className="spinner-container d-flex justify-content-center">
        <SpinningWheel />
      </div>
    </div>
  );
}

export default WheelSection;
