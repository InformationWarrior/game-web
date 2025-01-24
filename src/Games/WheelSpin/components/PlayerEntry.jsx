import React from "react";
import "../styles/PlayerEntry.css";
import BetAmountInput from "./BetAmountInput";
import RoundsInput from "./RoundsInput";
import GasSavings from "./GasSavings";
import AddSelection from "./AddSelection";

function PlayerEntry() {
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
      <AddSelection />
    </div>
  );
}

export default PlayerEntry;
