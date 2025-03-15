import React from "react";
import { FaEthereum } from "react-icons/fa";
import styles from "../../../styles/WheelSpin/PlayersList.module.css";
import playerAvatar from "../assets/playerAvatar.png";
function Player(props) {
  const {
    avatar,
    username,
    color,
    betAmount,
    percentage,
    isWinner,
  } = props;

  return (
    <div className={styles["player-wrapper"]}>
      <div className={styles["player"]}>
        <div className={styles["player-card"]} style={{ borderRightColor: color }}>
          <div className={styles[".player-img-wrap"]}>
            <img
              src={playerAvatar}
              alt={username}
              className={styles["player-img"]}
            />
          </div>

          <div className={styles["player-info"]}>
            <div className={styles["player-details"]}>
              <div className={styles["name-wrap"]}>
                <div className={styles["player-name"]}>
                  <div className={styles["name-text"]}>{username}</div>
                </div>
              </div>
            </div>
            <div className={styles["player-stats"]}>
              <div className={styles["win-chance-wrap"]}>
                <div className={styles["win-chance"]}>{percentage} %</div>
              </div>
              <div className={styles["bet-wrap"]}>
                <div className={styles["bet-text"]}>{betAmount} ETH</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;
