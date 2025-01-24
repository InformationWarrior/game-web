import React from "react";
import Spinner from "./Spinner";
import SpinnerTwo from "./SpinnerTwo";

function WheelSection() {
  return (
    <div className="wheel-section-container d-flex flex-column align-items-center justify-content-center h-100">
      <h4 className="text-white mb-4">Current Round</h4>
      <div className="spinner-container w-100 d-flex align-items-center justify-content-center">
        <Spinner />
      </div>
    </div>
  );
}

export default WheelSection;
