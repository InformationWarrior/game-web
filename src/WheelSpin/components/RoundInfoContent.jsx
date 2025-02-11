import React from "react";
import RoundInfo from "../../styles/WheelSpin/RoundInfo.module.css";

function RoundInfoContent(props) {
  const { headingData, subHeading } = props;
  return (
    <div className={RoundInfo.footerContent}>
      <div className={RoundInfo.footerContentTwo}>
        <div className={RoundInfo.data}>
          <p className={RoundInfo.dataText}>{headingData}</p>
        </div>
      </div>
      <p className={RoundInfo.text}>{subHeading}</p>
    </div>
  );
}

export default RoundInfoContent;
