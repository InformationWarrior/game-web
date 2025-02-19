import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEnteredPlayers,
  getParticipants,
  updateParticipatedPlayers,
} from "../../../Config/redux/slices/betsSlice";

import Player from "../components/Player";
import playerAvatar from "../assets/playerAvatar.png";
import styles from "../../../styles/WheelSpin/PlayersList.module.css";

function PlayersListSection() {
  const dispatch = useDispatch();
  const gameId = useSelector((state) => state.bets.gameId);
  const enteredPlayers = useSelector((state) => state.bets.enteredPlayers);
  const participants = useSelector((state) => state.bets.participants) || [];
  const gameState = useSelector((state) => state.wheelSpin.gameState);

  // Fetch entered players only if not already fetched
  useEffect(() => {
    if (gameId && enteredPlayers.length === 0) {
      dispatch(getEnteredPlayers(gameId));
    }
  }, [dispatch, gameId, enteredPlayers.length]);

  // Fetch participats when the game state is "betting"
  useEffect(() => {
    if (gameId && gameState === "BETTING" && participants.length === 0) {
      dispatch(getParticipants(gameId));
    }

    console.log("Participants:", participants);
  }, [dispatch, gameId, gameState, participants]);

  // ✅ Reset participants when the game state is "RESET"
  useEffect(() => {
    if (gameState === "RESET") {
      dispatch(updateParticipatedPlayers([])); 
    }
  }, [dispatch, gameState]);

  return (
    <div className={styles["players-list-content"]}>
      {/* Header */}
      <div className={styles["players-list-header"]}>
        <p className={styles["players-list-header-text"]}>
          {participants.length} Players
        </p>
        <span className="badge text-bg-warning">
          {enteredPlayers.length} Watching
        </span>
      </div>

      {/* Players List */}
      <div className={styles["players-list-body"]}>
        {Array.isArray(participants) && participants.length > 0 ? (
          participants.map((player, index) => (
            <Player
              key={player.walletAddress || `player-${index}`} 
              avatar={playerAvatar}
              username={player.username}
              points="0"
              percentage={0}
              value={0}
              isWinner={false}
            />
          ))
        ) : (
          <p className={styles["no-players"]}>No players yet.</p>
        )}
      </div>
    </div>
  );
}

export default PlayersListSection;
