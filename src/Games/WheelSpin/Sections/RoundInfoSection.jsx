import React from "react";
import RoundInfo from "../../../styles/WheelSpin/RoundInfo.module.css";
import { useSelector } from "react-redux";
import RoundInfoContent from "../components/RoundInfoContent";
import RoundInfoContentImage from "../components/RoundInfoContentImage";
import Timer from "../components/Timer";

function RoundInfoSection() {
  const { gameRound, inGameMessage } = useSelector((state) => state.wheelSpin);
  //console.log("In game message = ", inGameMessage);

  return (
    <div className={RoundInfo.content}>
      <div className={RoundInfo.head}>
        <p className={RoundInfo.headText}>Round {gameRound}</p>
        <div className={RoundInfo.timerPlaceholder}>
          <div className={RoundInfo.timer}>
            {/* Old style */}
            {/* <div className={RoundInfo.timerText}>
              <Timer className={RoundInfo.timerText} />
            </div> */}

            <Timer className={RoundInfo.timerText} />
          </div>
        </div>
      </div>

      <div className={RoundInfo.body}>
        <div className={RoundInfo.bodyContentGrid}>
          <RoundInfoContentImage headingData={"0"} subHeading={"Prize Pool"} />
          <RoundInfoContent headingData={"0/500"} subHeading={"Players"} />
          <RoundInfoContentImage
            headingData={"0"}
            subHeading={"Your Entries"}
          />
          <RoundInfoContent headingData={"0%"} subHeading={"Your Win Chance"} />
        </div>
        <hr className={RoundInfo.hrStyle} />

        <div className={RoundInfo.bodyFooter}>
          <RoundInfoContent
            headingData={"-----"}
            subHeading={"Your Future Entries"}
          />
          <RoundInfoContentImage
            headingData={"-----"}
            subHeading={"Total (0 Avg)"}
          />
        </div>
      </div>
    </div>
  );
}

export default RoundInfoSection;
