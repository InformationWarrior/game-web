import React from "react";
import "../styles/Player.css";
import { FaEthereum } from "react-icons/fa";
import styles from "../../../styles/WheelSpin/PlayersList.module.css";
import playerAvatar from "../assets/playerAvatar.png";
function Player(props) {
  const {
    avatar,
    username,
    points,
    percentage,
    value,
    isWinner,
    borderColorClass,
  } = props;

  return (
    <div className={styles["player-item"]}>
      <div className={styles["player-item-content"]}>
        <div className={styles["player-card"]}>
          <div className={styles["player-avatar-container"]}>
            <div className="player-avatar">
              <img src={playerAvatar} alt={username} />
            </div>
          </div>

          <div className={styles["player-info-container"]}>
            <div className={styles["player-details"]}>
              <div className={styles["player-name-container"]}>
                <div className={styles["player-name-wrapper"]}>
                  <p className={styles["player-name"]}>{username}</p>
                </div>
              </div>

              <div className={styles["player-points-container"]}>
                <p className={styles["player-points"]}>{points}</p>
              </div>
            </div>

            <div className={styles["player-stats-container"]}>
              <div className={styles["player-chance-container"]}>
                <p className={styles["player-chance"]}>100%</p>
              </div>

              <div className={styles["player-currency-container"]}>
                <p className={styles["player-currency"]}>{value}</p>
                {/* <FaEthereum className={styles["player-currency-icon"]} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;
