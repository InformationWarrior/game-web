import React from "react";
import { FaEthereum } from "react-icons/fa";
import "../styles/RoundContentItem.css";
import styles from "../../../styles/WheelSpin/PotSection.module.css";

function PotItem() {
  return (
    <div className={styles["pot-item"]}>
      <div className={styles["pot-item-card"]}>
        <div className={styles["pot-item-image-container"]}>
          <FaEthereum className={styles["pot-item-image-icon"]} />
        </div>
        <div
          className={styles["pot-item-text-container"]}
          style={{ justifyContent: "center" }}
        >
          {/* <FaEthereum className={styles["pot-item-currency-icon"]} /> */}
          <p className={styles["pot-item-text"]}>0.04</p>
        </div>
      </div>
    </div>
  );
}

export default PotItem;
