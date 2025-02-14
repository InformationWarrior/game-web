import React from "react";
import RoundInfo from "../../../styles/WheelSpin/RoundInfo.module.css";
import { useSelector } from "react-redux";
import RoundInfoContent from "../components/RoundInfoContent";
import RoundInfoContentImage from "../components/RoundInfoContentImage";
import Timer from "../components/Timer";

function RoundInfoSection() {
  const { gameRound, inGameMessage, totalPlayerRounds } = useSelector(
    (state) => state.wheelSpin
  );

  return (
    <div className={RoundInfo.content}>
      <div className={RoundInfo.head}>
        <p className={RoundInfo.headText}>Round 1</p>
        <div className={RoundInfo.timerPlaceholder}>
          <div className={RoundInfo.timer}>
            <Timer className={RoundInfo.timerText} />
          </div>
        </div>
      </div>

      <div className={RoundInfo.body}>
        <div className={RoundInfo.bodyContentGrid}>
          <RoundInfoContentImage headingData={"0"} subHeading={"Prize Pool"} />
          <RoundInfoContent
            // headingData={`0/500`}
            headingData={`${totalPlayerRounds}/500`}
            subHeading={"Players"}
          />
          <RoundInfoContentImage
            headingData={"0"}
            subHeading={"Your Entries"}
          />
          <RoundInfoContent
            headingData={`${(1 / totalPlayerRounds) * 100}%`}
            subHeading={"Your Win Chance"}
          />
        </div>
      </div>
    </div>
  );
}

export default RoundInfoSection;
