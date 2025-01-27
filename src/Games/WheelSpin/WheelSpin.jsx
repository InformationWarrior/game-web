import React from "react";
import "./styles/WheelSpin.css";
import RoundInfoSection from "./Sections/RoundInfoSection";
import RoundContentsSection from "./Sections/RoundContentsSection";
import PlayerEntrySection from "./Sections/PlayerEntrySection";
import WheelSection from "./Sections/WheelSection";
import PlayersListSection from "./Sections/PlayersListSection";

function WheelSpin() {
  return (
    <div className="container-fluid">
      <div className="row justify-content-evenly wheel-row">
        {/* Players List Section */}
        <div className="col-xxl-3 col-xl-3 col-md-3 col-12 bg-dark rounded overflow-auto players-list wheel-col">
          <PlayersListSection />
        </div>

        {/* Wheel Spin Section */}
        <div className="col-xxl-5 col-xl-5 col-md-5 col-12 wheel-col">
          {/* Top 75% Section */}
          <div className="row">
            <div className="col-12 bg-dark rounded">
              <WheelSection />
            </div>
          </div>
          {/* Bottom 25% Section */}
          <div className="row">
            <div className="col-12 bg-dark rounded d-flex align-items-center justify-content-center">
              <RoundContentsSection />
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="col-xxl-3 col-xl-3 col-md-3 col-12 wheel-col">
          {/* Top 50% Section */}
          <div className="row">
            <div className="col-12 bg-dark rounded d-flex align-items-center justify-content-center">
              <RoundInfoSection />
            </div>
          </div>
          {/* Bottom 50% Section */}
          <div className="row">
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
