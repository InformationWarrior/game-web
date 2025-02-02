import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_GAME } from "../../NetworkManager/graphql/modules/BETS/mutations";

// CSS Modules
import PageLayout from "../../styles/WheelSpin/PageLayout.module.css";
import GridLayout from "../../styles/WheelSpin/GridLayout.module.css";
import PlayersList from "../../styles/WheelSpin/PlayersList.module.css";
import SpinWheel from "../../styles/WheelSpin/SpinWheel.module.css";
import RoundInfo from "../../styles/WheelSpin/RoundInfo.module.css";
import PotSectionStyle from "../../styles/WheelSpin/PotSection.module.css";
import PlayerBets from "../../styles/WheelSpin/PlayerBets.module.css";

// Components
import RoundInfoSection from "./Sections/RoundInfoSection";
import PotSection from "./Sections/PotSection";
import PlayerEntrySection from "./Sections/PlayerEntrySection";
import WheelSection from "./Sections/WheelSection";
import PlayersListSection from "./Sections/PlayersListSection";

function WheelSpin() {
  const [createGame, { loading, error, data }] = useMutation(CREATE_GAME);

  useEffect(() => {
    const initializeGame = async () => {
      try {
        const response = await createGame({
          variables: { name: "Wheel Spin" },
        });
        console.log("Game created successfully:", response.data.createGame);
      } catch (err) {
        console.error("Error creating game:", err);
      }
    };

    initializeGame();
  }, [createGame]);

  return (
    <div className={PageLayout["page-layout-container"]}>
      {/* {loading && (
        <p className="text-center text-white">Starting the game...</p>
      )}
      {error && (
        <p className="text-center text-danger">Error: {error.message}</p>
      )}
      {data && (
        <p className="text-center text-success">
          Game Created: {data.createGame._id}
        </p>
      )} */}

      <div className={GridLayout.container}>
        <div className={PlayersList["players-list-container"]}>
          <PlayersListSection />
        </div>
        <div className={SpinWheel.container}>
          <WheelSection />
        </div>
        <div className={RoundInfo.container}>
          <RoundInfoSection />
        </div>
        <div className={PotSectionStyle["pot-content-wrapper"]}>
          <PotSection />
        </div>
        <div className={PlayerBets.container}>
          <PlayerEntrySection />
        </div>
      </div>
    </div>
  );
}

export default WheelSpin;
