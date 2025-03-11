import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Player from "../components/Player";
import {
  getEnteredPlayers,
  RoundUpdates,
} from "../../../Config/redux/slices/betsActions";
import playerAvatar from "../assets/playerAvatar.png";
import styles from "../../../styles/WheelSpin/PlayersList.module.css";

function PlayersListSection() {
  const dispatch = useDispatch();
  const gameId = useSelector((state) => state.bets.gameId);
  const enteredPlayers = useSelector((state) => state.bets.enteredPlayers);
  const participants = useSelector((state) => state.bets.participants) || [];

  useEffect(() => {
    if (gameId && enteredPlayers.length === 0) {
      dispatch(getEnteredPlayers(gameId));
    }
  }, [dispatch, gameId, enteredPlayers.length]);

  useEffect(() => {
    if (gameId) {
      const unsubscribe = dispatch(RoundUpdates(gameId));
      return () => {
        unsubscribe();
      };
    }
  }, [dispatch, gameId]);

  return (
    <div className={styles["players-list-content"]}>
      {/* Header */}
      <div className={styles["players-list-header"]}>
        <p className={styles["players-list-header-text"]}>
          {participants.length} Player
          {participants.length > 1 ? "s" : ""}
        </p>
        <span
          className={`badge text-bg-warning ${styles["players-list-watching"]}`}
        >
          {enteredPlayers.length} Watching
        </span>
      </div>

      {/* Players List */}
      <div className={styles["players-list-body"]}>
        {Array.isArray(participants) && participants.length > 0 ? (
          participants.map((player, index) => (
            <Player
              key={player.walletAddress || `player-${player.username || index}`}
              avatar={playerAvatar}
              username={player.username}
              points={player.betAmount}
              percentage={player.winningChance}
              value={player.currency}
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
