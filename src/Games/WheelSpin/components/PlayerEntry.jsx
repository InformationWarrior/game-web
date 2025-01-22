import React from "react";
import { FaEthereum, FaDice, FaQuestionCircle } from "react-icons/fa";
import "../styles/PlayerEntry.css";

function PlayerEntry() {
  return (
    <div className="player-entry-container p-4 bg-dark text-white rounded">
      {/* ETH Entry per Round */}
      <div className="mb-4">
        <h6 className="fw-bold mb-2">ETH entry per round</h6>
        <div className="input-group mb-2">
          <input
            type="text"
            className="form-control bg-secondary border-0 text-white"
            placeholder=""
            disabled
          />
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary eth-btn">
            <FaEthereum /> 0.01
          </button>
          <button className="btn btn-outline-secondary eth-btn">
            <FaEthereum /> 0.05
          </button>
          <button className="btn btn-outline-secondary eth-btn">
            <FaEthereum /> 0.1
          </button>
          <button className="btn btn-outline-secondary eth-btn">
            <FaDice />
          </button>
        </div>
        <p className="text-white mt-2">
          ETH in wallet: <span className="text-white">( $0.00 ) 0 ETH</span>
        </p>
      </div>

      {/* Number of Rounds */}
      <div className="mb-4">
        <h6 className="fw-bold mb-2 d-flex align-items-center gap-1">
          Number of Rounds <FaQuestionCircle className="text-white" />
        </h6>
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline-secondary round-control-btn">
            -
          </button>
          <input
            type="text"
            className="form-control bg-secondary border-0 text-white text-center"
            value="1"
            readOnly
          />
          <button className="btn btn-outline-secondary round-control-btn">
            +
          </button>
          <button className="btn btn-outline-secondary max-btn">Max</button>
        </div>
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
