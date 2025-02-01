import React from "react";
import { FaEthereum } from "react-icons/fa";
import "../styles/RoundContentItem.css";
import styles from "../../../styles/WheelSpin/PotSection.module.css";

function PotItem() {
  return (
    <div className={styles["round-item"]}>
      <div className={styles["round-item-card"]}>
        <div className={styles["round-item-image-container"]}>
          <FaEthereum className={styles["round-item-image-icon"]} />
        </div>
        <div
          className={styles["round-item-text-container"]}
          style={{ justifyContent: "center" }}
        >
          {/* <FaEthereum className={styles["round-item-currency-icon"]} /> */}
          <p className={styles["round-item-text"]}>0.04</p>
        </div>
      </div>
    </div>
  );
}

export default PotItem;
