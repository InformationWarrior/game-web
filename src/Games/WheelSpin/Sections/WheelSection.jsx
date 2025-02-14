import React from "react";
import SpinningWheel from "../components/SpinningWheel";
import LatestSpinWheel from "../components/LatestSpinWheel";
import styles from "../../../styles/WheelSpin/SpinWheel.module.css";
import MainWheelInUse from "../components/MainWheelnUse";
// import SpinningWheelForReference from "../components/SpinningWheelForReference";

function WheelSection() {
  return (
    <div className={styles.content}>
      <h4 className={styles.heading}>Current Round</h4>
      <div className={styles.main}>
        {/* <SpinningWheel /> */}
        <LatestSpinWheel />
        {/* <SpinningWheelForReference /> */}
        {/* <MainWheelInUse /> */}
      </div>
    </div>
  );
}

export default WheelSection;
