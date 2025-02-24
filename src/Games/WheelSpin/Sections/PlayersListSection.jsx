import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Player from "../components/Player";
import {
  getEnteredPlayers,
  getParticipants,
  getBets,
  playerParticipated,
  betPlaced,
  resetBets,
  resetParticipants,
} from "../../../Config/redux/slices/betsSlice"; // Import the action
import playerAvatar from "../assets/playerAvatar.png";
import styles from "../../../styles/WheelSpin/PlayersList.module.css";

function PlayersListSection() {
  const dispatch = useDispatch();
  const gameId = useSelector((state) => state.bets.gameId);
  const enteredPlayers = useSelector((state) => state.bets.enteredPlayers);
  const participants = useSelector((state) => state.bets.participants) || [];
  const gameState = useSelector((state) => state.wheelSpin.gameState);

  // ✅ Fetch entered players only if not already fetched
  useEffect(() => {
    if (gameId && enteredPlayers.length === 0) {
      dispatch(getEnteredPlayers(gameId));
    }
  }, [dispatch, gameId, enteredPlayers.length]);

  // ✅ Fetch participants only when game state is "BETTING"
  useEffect(() => {
    if (gameId && gameState === "BETTING") {
      dispatch(getParticipants(gameId));
      dispatch(getBets(gameId)); // ✅ Fetch all bets
      dispatch(playerParticipated(gameId)); // ✅ Start participant subscription
      dispatch(betPlaced(gameId)); // ✅ Start bet subscription
    }
  }, [dispatch, gameId, gameState]);

  // ✅ Reset participants and bets when game state is "RESETTING"
  useEffect(() => {
    if (gameState === "RESET") {
      console.log("Game state is RESETTING: Clearing participants and bets...");
      dispatch(resetParticipants());
      dispatch(resetBets());
    }
  }, [gameState, dispatch]);

  // ✅ Remove duplicate players based on walletAddress
  const uniqueParticipants = [
    ...new Map(
      participants.map((player) => [player.walletAddress, player])
    ).values(),
  ];

  return (
    <div className={styles["players-list-content"]}>
      {/* Header */}
      <div className={styles["players-list-header"]}>
        <p className={styles["players-list-header-text"]}>
          {uniqueParticipants.length} Player
          {uniqueParticipants.length > 1 ? "s" : ""}
        </p>
        <span
          className={`badge text-bg-warning ${styles["players-list-watching"]}`}
        >
          {enteredPlayers.length} Watching
        </span>
      </div>

      {/* Players List */}
      <div className={styles["players-list-body"]}>
        {Array.isArray(uniqueParticipants) && uniqueParticipants.length > 0 ? (
          uniqueParticipants.map((player, index) => (
            <Player
              key={player.walletAddress || `player-${player.username || index}`} // Unique key
              avatar={playerAvatar}
              username={player.username}
              points={player.betAmount}
              percentage={0}
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
  // return (
  //   <div className={styles["players-list-content"]}>
  //     {/* Header */}
  //     <div className={styles["players-list-header"]}>
  //       <p className={styles["players-list-header-text"]}>
  //         {participants.length} Player{participants.length > 1 ? "s" : ""}
  //       </p>
  //       <span
  //         className={`badge text-bg-warning ${styles["players-list-watching"]}`}
  //       >
  //         {enteredPlayers.length} Watching
  //       </span>
  //     </div>

  //     {/* Players List */}
  //     <div className={styles["players-list-body"]}>
  //       {Array.isArray(participants) && participants.length > 0 ? (
  //         participants.map((player, index) => (
  //           <Player
  //             key={player.walletAddress || `player-${index}`}
  //             avatar={playerAvatar}
  //             username={player.username}
  //             points="0"
  //             percentage={0}
  //             value={0}
  //             isWinner={false}
  //           />
  //         ))
  //       ) : (
  //         <p className={styles["no-players"]}>No players yet.</p>
  //       )}
  //     </div>
  //   </div>
  // );
}

export default PlayersListSection;
