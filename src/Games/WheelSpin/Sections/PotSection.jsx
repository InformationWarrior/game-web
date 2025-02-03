import React from "react";
import PotItem from "../components/PotItem";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../styles/RoundContents.css";
import styles from "../../../styles/WheelSpin/PotSection.module.css";

function PotSection() {
  return (
    <div>
      <div className={styles["pot-content-header"]}>
        <p className={styles["pot-content-title"]}>Round Contents</p>
        <div className={styles["pot-navigation"]}>
          <button className={styles["pot-nav-button-left"]}>
            <FaChevronLeft />
          </button>
          <button className={styles["pot-nav-button-right"]}>
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className={styles["pot-content-scroll"]}>
        <PotItem />
        <PotItem />
        <PotItem />
      </div>
    </div>
  );
}

export default PotSection;
