// import React from "react";
// import "../styles/RoundInfo.css";

// const RoundInfoSection = () => {
// const { gameRound, inGameMessage } = useSelector((state) => state.wheelSpin);

// console.log("In game message = ", inGameMessage);
//   return (
//     <div className="round-info-container bg-dark text-white p-3 rounded">
//       {/* Header Section */}
//       <div className="row align-items-center mb-1">
//         <div className="col">
//           <h3 className="mb-0 fs-6 fw-medium">Round {gameRound}</h3>
//         </div>
//         <div className="col-auto">
//           {/* Timer Component */}
//           <AnotherTimerComponent />
//         </div>
//       </div>

//       {/* Message Section */}
//       {/* <div className="message-section bg-secondary text-white p-3 rounded">
//         <div className="current-message-container">
//           {inGameMessage ? (
//             <div className="current-message py-1">{inGameMessage}</div>
//           ) : (
//             ""
//           )}
//         </div>}
//       </div> */
//     </div>
//   );
// };

import React from "react";
import RoundInfo from "../../../styles/WheelSpin/RoundInfo.module.css";
// import AnotherTimerComponent from "../components/AnotherTimerComponent";
import { useSelector } from "react-redux";
import RoundInfoContent from "../components/RoundInfoContent";
import RoundInfoContentImage from "../components/RoundInfoContentImage";

function RoundInfoSection() {
  const { gameRound, inGameMessage } = useSelector((state) => state.wheelSpin);
  console.log("In game message = ", inGameMessage);

  return (
    <div className={RoundInfo.content}>
      <div className={RoundInfo.head}>
        <p className={RoundInfo.headText}>Round {gameRound}</p>
        <div className={RoundInfo.timerPlaceholder}>
          {/* <div className={RoundInfo.timer}>
            <p className={RoundInfo.timerText}>02:00</p>
            <AnotherTimerComponent />
          </div> */}
          {/* <AnotherTimerComponent /> */}
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
