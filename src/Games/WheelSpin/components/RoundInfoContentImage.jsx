import React from "react";
import { FaEthereum } from "react-icons/fa";
import RoundInfo from "../../../styles/WheelSpin/RoundInfo.module.css";

function RoundInfoContentImage(props) {
  const { headingData, subHeading } = props;
  return (
    <div className={RoundInfo.footerContent}>
      <div className={RoundInfo.footerContentTwo}>
        {/* <FaEthereum /> */}
        <div className={RoundInfo.data}>
          <p className={RoundInfo.dataText}>{headingData}</p>
        </div>
      </div>
      <p className={RoundInfo.text}>{subHeading}</p>
    </div>
  );
}

export default RoundInfoContentImage;
