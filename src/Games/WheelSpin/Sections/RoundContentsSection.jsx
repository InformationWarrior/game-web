import React from "react";
import RoundContentItem from "../components/RoundContentItem";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../styles/RoundContents.css";
import styles from "../../../styles/WheelSpin/RoundContents.module.css";

function RoundContentsSection() {
  return (
    <div>
      <div className={styles["round-content-header"]}>
        <p className={styles["round-content-title"]}>Round Contents</p>
        <div className={styles["round-navigation"]}>
          <button className={styles["round-nav-button-left"]}>
            <FaChevronLeft />
          </button>
          <button className={styles["round-nav-button-right"]}>
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className={styles["round-content-scroll"]}>
        <RoundContentItem />
        <RoundContentItem />
        <RoundContentItem />
      </div>
    </div>
  );
}

export default RoundContentsSection;
