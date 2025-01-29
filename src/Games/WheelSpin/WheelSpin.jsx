import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_GAME } from "../../NetworkManager/graphql/modules/BETS/mutations";
import "./styles/WheelSpin.css";
import RoundInfoSection from "./Sections/RoundInfoSection";
import RoundContentsSection from "./Sections/RoundContentsSection";
import PlayerEntrySection from "./Sections/PlayerEntrySection";
import WheelSection from "./Sections/WheelSection";
import PlayersListSection from "./Sections/PlayersListSection";

function WheelSpin() {
  // Apollo mutation hook
  const [createGame, { loading, error, data }] = useMutation(CREATE_GAME);

  useEffect(() => {
    // Call CreateGame mutation when the component loads
    const initializeGame = async () => {
      try {
        const response = await createGame({
          variables: { name: "Wheel Spin" }, // Pass the game name
        });
        console.log("Game created successfully:", response.data.createGame);
        // You can handle game initialization, state updates, or redirection here
      } catch (err) {
        console.error("Error creating game:", err);
      }
    };

    initializeGame();
  }, [createGame]);

  return (
    <div className="container-fluid">
      {loading && (
        <p className="text-center text-white">Starting the game...</p>
      )}
      {error && (
        <p className="text-center text-danger">Error: {error.message}</p>
      )}
      {data && (
        <p className="text-center text-success">
          Game Created: {data.createGame._id}
        </p>
      )}

      <div className="row justify-content-evenly wheel-row">
        {/* Players List Section */}
        <div className="col-xxl-3 col-xl-3 col-md-3 col-12 bg-dark rounded overflow-auto players-list wheel-col">
          <PlayersListSection />
        </div>

        {/* Wheel Spin Section */}
        <div className="col-xxl-5 col-xl-5 col-md-5 col-12 wheel-col">
          {/* Top 75% Section */}
          <div className="row">
            <div className="col-12 bg-dark rounded">
              <WheelSection />
            </div>
          </div>
          {/* Bottom 25% Section */}
          <div className="row">
            <div className="col-12 bg-dark rounded d-flex align-items-center justify-content-center">
              <RoundContentsSection />
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="col-xxl-3 col-xl-3 col-md-3 col-12 wheel-col">
          {/* Top 50% Section */}
          <div className="row">
            <div className="col-12 bg-dark rounded d-flex align-items-center justify-content-center">
              <RoundInfoSection />
            </div>
          </div>
          {/* Bottom 50% Section */}
          <div className="row">
            <div className="col-12 bg-dark rounded d-flex align-items-stretch justify-content-center">
              <PlayerEntrySection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WheelSpin;
