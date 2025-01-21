import React from "react";
import "../styles/RoundInfo.css";

const RoundInfo = () => {
  return (
    <div className="round-info-container bg-dark text-white p-3 rounded">
      {/* Header Section */}
      <div className="round-header d-flex justify-content-between align-items-center">
        <h3 className="round-title mb-0 fs-6 fw-medium">Round 215455</h3>
        <div className="timer-placeholder bg-secondary text-white rounded text-center px-2 py-1">
          00:00
        </div>
      </div>

      <hr className="divider my-3" />

      {/* Details Section */}
      <div className="round-details row text-center mb-3">
        <div className="detail-item col-6">
          <div className="detail-value fs-5 fw-bold">0.11</div>
          <div className="detail-label text-muted">Prize Pool</div>
        </div>
        <div className="detail-item col-6">
          <div className="detail-value fs-5 fw-bold">2/500</div>
          <div className="detail-label text-muted">Players</div>
        </div>
        <div className="detail-item col-6">
          <div className="detail-value fs-5 fw-bold">0</div>
          <div className="detail-label text-muted">Your Entries</div>
        </div>
        <div className="detail-item col-6">
          <div className="detail-value fs-5 fw-bold">0%</div>
          <div className="detail-label text-muted">Your Win Chance</div>
        </div>
      </div>

      <hr className="divider my-3" />

      {/* Footer Section */}
      <div className="round-footer row text-center">
        <div className="footer-item col-6">
          <div className="footer-value fs-5 fw-bold">-</div>
          <div className="footer-label text-muted">Your Future Entries</div>
        </div>
        <div className="footer-item col-6">
          <div className="footer-value fs-5 fw-bold">- ETH</div>
          <div className="footer-label text-muted">Total (0 Avg)</div>
        </div>
      </div>
    </div>
  );
};

export default RoundInfo;
