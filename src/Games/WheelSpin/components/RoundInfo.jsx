import React, { useState } from "react";
import "../styles/RoundInfo.css";
import TimerComponent from "./TimerComponent";
import { useSelector } from "react-redux";

const RoundInfo = () => {
  const { gameRound, inGameMessage } = useSelector((state) => state.wheelSpin);

  console.log("In game message = ", inGameMessage);
  return (
    <div className="round-info-container bg-dark text-white p-3 rounded">
      {/* Header Section */}
      <div className="row align-items-center mb-1">
        <div className="col">
          <h3 className="mb-0 fs-6 fw-medium">Round {gameRound}</h3>
        </div>
        <div className="col-auto">
          {/* Timer Component */}
          <TimerComponent />
        </div>
      </div>

      {/* Details Section */}
      <div className="row text-center mb-3">
        <div className="col-6">
          <div className="fs-5 fw-bold">0.11</div>
          <div className="text-white">Prize Pool</div>
        </div>
        <div className="col-6">
          <div className="fs-5 fw-bold">2/500</div>
          <div className="text-white">Players</div>
        </div>
        <div className="col-6">
          <div className="fs-5 fw-bold">0</div>
          <div className="text-white">Your Entries</div>
        </div>
        <div className="col-6">
          <div className="fs-5 fw-bold">0%</div>
          <div className="fs-6 text-white">Your Win Chance</div>
        </div>
      </div>

      <hr className="divider my-3" />

      {/* Footer Section */}
      <div className="row text-center">
        <div className="col-6">
          <div className="fs-5 fw-bold">--</div>
          <div className="text-white">Your Future Entries</div>
        </div>
        <div className="col-6">
          <div className="fs-5 fw-bold">--</div>
          <div className="text-white">Total (0 Avg)</div>
        </div>
      </div>

      <hr className="divider my-3" />

      {/* Message Section */}
      <div className="message-section bg-secondary text-white p-3 rounded">
        {/* <h5 className="fs-6 fw-bold mb-2">In-Game Message</h5> */}
        <div className="current-message-container">
          {inGameMessage ? (
            <div className="current-message py-1">{inGameMessage}</div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default RoundInfo;
