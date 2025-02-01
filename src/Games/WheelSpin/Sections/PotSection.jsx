import React from "react";
import PotItem from "../components/PotItem";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../styles/RoundContents.css";
import styles from "../../../styles/WheelSpin/PotSection.module.css";

function PotSection() {
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
        <PotItem />
        <PotItem />
        <PotItem />
      </div>
    </div>
  );
}

export default PotSection;
