import React from "react";
import WheelWithPin from "../components/WheelWithPin";
import styles from "../../../styles/WheelSpin/SpinWheel.module.css";
// import GameState from "../components/GameStatus";
import GameStatus from "../components/GameStatus";

function WheelSection() {
  return (
    <div className={styles.content}>
      <h4 className={styles.heading}>Current Round</h4>
      <div className={styles.main}>
        {/* <WheelWithPin /> */}
        <GameStatus />
      </div>
    </div>
  );
}

export default WheelSection;
