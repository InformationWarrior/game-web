import React from "react";
import { FaEthereum } from "react-icons/fa";
import styles from "../../../styles/WheelSpin/RoundInfo.module.css";

function RoundInfoContentImage(props) {
  const { headingData, subHeading } = props;
  return (
    <div className={styles.footerContent}>
      <div className={styles.footerContentTwo}>
        {/* <FaEthereum /> */}
        <div className={styles.data}>
          <p className={styles.dataText}>{headingData}</p>
        </div>
      </div>
      <p className={styles.text}>{subHeading}</p>
    </div>
  );
}

export default RoundInfoContentImage;
