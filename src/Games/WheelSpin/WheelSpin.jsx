import React from "react";
import "./styles/WheelSpin.css";
import RoundInfo from "./components/RoundInfo";
import PlayersList from "./components/PlayersList";
import RoundContents from "./components/RoundContents";
import PlayerEntry from "./components/PlayerEntry";
import WheelSection from "./components/WheelSection";

function WheelSpin() {
  return (
    <div className="container-fluid vh-100">
      <div className="row h-100 g-4">
        {/* Players List Section */}
        <div className="col-xxl-3 col-xl-3 col-md-3 col-12 bg-dark rounded overflow-auto mb-3 players-list">
          <PlayersList />
        </div>

        {/* Wheel Spin Section */}
        <div className="col-xxl-6 col-xl-6 col-md-6 col-12 vh-100">
          {/* Top 75% Section */}
          <div className="row h-75 g-3 mb-2">
            <div className="col-12 bg-dark rounded d-flex align-items-center justify-content-center">
              <WheelSection />
            </div>
          </div>
          {/* Bottom 25% Section */}
          <div className="row h-25 g-3 mt-2">
            <div className="col-12 bg-dark rounded d-flex align-items-center justify-content-center">
              <RoundContents />
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="col-xxl-3 col-xl-3 col-md-3 col-12">
          {/* Top 50% Section */}
          <div className="row h-50 g-3 mb-3">
            <div className="col-12 bg-dark rounded d-flex align-items-center justify-content-center">
              <RoundInfo />
            </div>
          </div>
          {/* Bottom 50% Section */}
          <div className="row h-50 g-3">
            <div className="col-12 bg-dark rounded d-flex align-items-stretch justify-content-center">
              <PlayerEntry />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WheelSpin;
