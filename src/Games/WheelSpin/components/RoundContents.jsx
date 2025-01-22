import React from "react";
import RoundContentItem from "./RoundContentItem";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../styles/RoundContents.css";

function RoundContents() {
  return (
    <div className="round-contents-container text-white p-3">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="round-contents-title mb-0">Round Contents</h5>
        <div className="d-flex gap-2">
          {/* Navigation Buttons */}
          <button className="round-nav-button d-flex align-items-center justify-content-center">
            <FaChevronLeft />
          </button>
          <button className="round-nav-button d-flex align-items-center justify-content-center">
            <FaChevronRight />
          </button>
        </div>
      </div>
      {/* Scrollable Items */}
      <div className="round-items-wrapper">
        <div className="round-items d-flex gap-3">
          <RoundContentItem />
          <RoundContentItem />
          <RoundContentItem />
          <RoundContentItem />
          <RoundContentItem />
          <RoundContentItem />
          <RoundContentItem />
          <RoundContentItem />
          <RoundContentItem />
          <RoundContentItem />
          <RoundContentItem />
          <RoundContentItem />
          <RoundContentItem />
          <RoundContentItem />
          <RoundContentItem />
          <RoundContentItem />
          <RoundContentItem />
          <RoundContentItem />
          <RoundContentItem />
          <RoundContentItem />
          <RoundContentItem />
          <RoundContentItem />
          <RoundContentItem />
          <RoundContentItem />
        </div>
      </div>
    </div>
  );
}

export default RoundContents;
