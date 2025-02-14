import React from "react";
// import "../styles/PlayerEntry.css";
import BetAmountInput from "../components/BetAmountInput";
import RoundsInput from "../components/RoundsInput";
import GasSavings from "../components/GasSavings";
import AddSelection from "../components/AddSelection";
import PlaceBet from "../components/PlaceBet";

function PlayerEntrySection() {
  return (
    <div className="player-entry-container p-4 bg-dark text-white rounded">
      {/* ETH Entry per Round */}
      <div className="mb-4">
        <BetAmountInput />
      </div>

      {/* Number of Rounds */}
      <div className="mb-4">
        <RoundsInput />
      </div>

      {/* Gas Savings */}
      <GasSavings />

      {/* Add Selection Button */}
      <PlaceBet />
    </div>
  );
}

export default PlayerEntrySection;
