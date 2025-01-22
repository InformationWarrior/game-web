import React from "react";
import { FaEthereum } from "react-icons/fa";
import "../styles/RoundContentItem.css";

function RoundContentItem() {
  return (
    <div className="round-content-item d-flex flex-column align-items-center">
      {/* Icon Section */}
      <div className="item-icon-container d-flex align-items-center justify-content-center">
        <FaEthereum className="item-icon" />
      </div>
      {/* Value Section */}
      <div className="item-value">0.04</div>
    </div>
  );
}

export default RoundContentItem;
