import React from "react";
import "../styles/InvitePanel.css";

const InvitePanel = ({ onClose }) => {
  return (
    <div className="invite-panel-overlay">
      <div className="invite-panel">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="invite-content">
          <h2>Referrals</h2>
          <p>
            Refer a friend to earn <b>20% of the points</b> they make. And if
            your friend refers another friend, you’ll earn <b>5%</b> of their
            points too! <br />
            <span className="terms-text">Terms apply.</span>
          </p>
          <div className="referral-box">
            <input
              type="text"
              placeholder="Your Referral Link"
              className="referral-input"
              disabled
            />
            <button className="connect-button">Connect</button>
          </div>
        </div>
        <a href="/" className="learn-more">
          Learn More &#8599;
        </a>
      </div>
    </div>
  );
};

export default InvitePanel;
