import React from "react";
import { FaEthereum, FaDice, FaQuestionCircle } from "react-icons/fa";
import "../styles/PlayerEntry.css";
import BetAmountInput from "./BetAmountInput";
import RoundsInput from "./RoundsInput";

function PlayerEntry() {
  return (
    <div className="player-entry-container p-4 bg-dark text-white rounded">
      {/* ETH Entry per Round */}
      <div className="mb-4">
        <h6 className="fw-bold mb-2">ETH entry per round</h6>
        <BetAmountInput />
      </div>

      {/* Number of Rounds */}
      <div className="mb-4">
        <RoundsInput />
      </div>

      {/* Total Entry */}
      <div className="mb-3">
        <h6 className="fw-bold mb-1">Total Entry</h6>
        <p className="text-white">
          ( $0.00 ) <span className="text-white">0 ETH</span>
        </p>
      </div>

      {/* Estimated Gas Savings */}
      <div className="mb-4">
        <h6 className="fw-bold mb-1">Est. gas savings:</h6>
        <p className="text-white">
          ( $0.00 ) <span className="text-white">0 ETH</span>
        </p>
      </div>

      {/* Add Selection Button */}
      <button className="btn btn-secondary w-100 rounded py-2">
        Add Selection
      </button>
    </div>
  );
}

export default PlayerEntry;
