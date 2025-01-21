import React from "react";
import PlayersList from "./components/PlayersList";
import "./styles/WheelSpin.css";
import RoundInfo from "./components/RoundInfo";

function WheelSpin() {
  return (
    <div className="container-fluid vh-100 bg-dark text-white">
      <div className="row h-100 g-4">
        {/* Players List Section */}
        <div
          className="col-md-3 bg-secondary overflow-auto"
          style={{ maxHeight: "100%", padding: "0px" }} // Ensures content stays within this column and is scrollable
        >
          <PlayersList />
        </div>

        {/* Wheel Spin Section */}
        <div className="col-md-6">
          <div className="row h-75 g-2">
            {/* Central Spinning Area */}
            <div className="col-12 bg-dark d-flex align-items-center justify-content-center border p-4">
              <h5>Wheel Spin</h5>
            </div>
          </div>
          <div className="row h-25 g-2 mt-2">
            {/* Round Content Area */}
            <div className="col-12 bg-secondary d-flex align-items-center justify-content-center border p-4">
              <h5>Round Content</h5>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="col-md-3">
          <div className="row h-50 g-2">
            <div className="col-12 bg-secondary d-flex align-items-center justify-content-center border p-4">
              <RoundInfo />
            </div>
          </div>
          <div className="row h-50 g-2 mt-2">
            <div className="col-12 bg-secondary d-flex align-items-center justify-content-center border p-4">
              <h5>Other Info</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WheelSpin;
