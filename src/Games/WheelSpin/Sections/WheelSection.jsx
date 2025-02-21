import React from "react";
import Wheel from "../components/Wheel";
import styles from "../../../styles/WheelSpin/SpinWheel.module.css";

function WheelSection() {
  return (
    <div className={styles.content}>
      <h4 className={styles.heading}>Current Round</h4>
      <div className={styles.main}>
        <Wheel />
      </div>
    </div>
  );
}

export default WheelSection;
