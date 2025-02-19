import React from "react";
import RoundInfo from "../../../styles/WheelSpin/RoundInfo.module.css";
import { useSelector } from "react-redux";
import RoundInfoContent from "../components/RoundInfoContent";
import RoundInfoContentImage from "../components/RoundInfoContentImage";
import Timer from "../components/Timer";

function RoundInfoSection() {
  const participants = useSelector((state) => state.bets.participants) || [];

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
            headingData={`${participants.length}/500`}
            subHeading={"Players"}
          />
          <RoundInfoContentImage
            headingData={"0"}
            subHeading={"Your Entries"}
          />
          <RoundInfoContent
            headingData={
              participants.length > 0
                ? `${((1 / participants.length) * 100).toFixed(2)}%`
                : "---"
            }
            subHeading={"Your Win Chance"}
          />
        </div>
      </div>
    </div>
  );
}

export default RoundInfoSection;
