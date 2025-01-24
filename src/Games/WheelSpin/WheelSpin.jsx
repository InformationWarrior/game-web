import React from "react";
import "./styles/WheelSpin.css";
import RoundInfoSection from "./Sections/RoundInfoSection";
import RoundContentsSection from "./Sections/RoundContentsSection";
import PlayerEntrySection from "./Sections/PlayerEntrySection";
import WheelSection from "./Sections/WheelSection";
import PlayersListSection from "./Sections/PlayersListSection";

function WheelSpin() {
  return (
    <div className="container-fluid vh-100">
      <div className="row h-100 g-4">
        {/* Players List Section */}
        <div className="col-xxl-3 col-xl-3 col-md-3 col-12 bg-dark rounded overflow-auto mb-3 players-list">
          <PlayersListSection />
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
              <RoundContentsSection />
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="col-xxl-3 col-xl-3 col-md-3 col-12">
          {/* Top 50% Section */}
          <div className="row h-50 g-3 mb-3">
            <div className="col-12 bg-dark rounded d-flex align-items-center justify-content-center">
              <RoundInfoSection />
            </div>
          </div>
          {/* Bottom 50% Section */}
          <div className="row h-50 g-3">
            <div className="col-12 bg-dark rounded d-flex align-items-stretch justify-content-center">
              <PlayerEntrySection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WheelSpin;
