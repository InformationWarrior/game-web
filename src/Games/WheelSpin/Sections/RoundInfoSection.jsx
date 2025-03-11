import React, { useEffect } from "react";
import RoundInfo from "../../../styles/WheelSpin/RoundInfo.module.css";
import { useDispatch, useSelector } from "react-redux";
import RoundInfoContent from "../components/RoundInfoContent";
import RoundInfoContentImage from "../components/RoundInfoContentImage";
import Timer from "../components/Timer";
import { getRound, RoundUpdates } from "../../../Config/redux/slices/betsActions";

function RoundInfoSection() {
  const dispatch = useDispatch();

  const walletAddress = useSelector(
    (state) => state.bets.player?.walletAddress
  );

  const round = useSelector((state) => state.bets.round);
  const gameId = useSelector((state) => state.bets.gameId);

  useEffect(() => {
    if (gameId) {
      dispatch(getRound(gameId, walletAddress)); // Fetch initial round data
      dispatch(RoundUpdates(gameId)); // Subscribe to updates
    }
  }, [gameId, dispatch]);

  const participants = useSelector((state) => state.bets.participants) || [];

  const playerParticipant = participants.find(
    (participant) => participant.walletAddress === walletAddress
  );

  return (
    <div className={RoundInfo.content}>
      <div className={RoundInfo.head}>
        <p className={RoundInfo.headText}>
          Round {round?.roundNumber || "---"}
        </p>
        <div className={RoundInfo.timerPlaceholder}>
          <div className={RoundInfo.timer}>
            <Timer className={RoundInfo.timerText} />
          </div>
        </div>
      </div>

      <div className={RoundInfo.body}>
        <div className={RoundInfo.bodyContentGrid}>
          <RoundInfoContentImage
            headingData={round ? round.totalBetAmount : 0}
            subHeading={"Prize Pool"}
          />
          <RoundInfoContent
            headingData={`${participants.length}/500`}
            subHeading={"Players"}
          />
          <RoundInfoContentImage
            headingData={playerParticipant ? playerParticipant.betAmount : "0"}
            subHeading={"Your Entries"}
          />
          <RoundInfoContent
            headingData={
              playerParticipant
                ? `${playerParticipant.winningChance.toFixed(2)} %`
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
