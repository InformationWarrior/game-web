import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { joinGame } from "../../Config/redux/slices/betsSlice";
import styles from "../../styles/BETS/Games.module.css";

function GameCard({ title, description, imgSrc, path, gameId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const walletAddress = useSelector((state) => state.bets.wallet.address);

  const handleJoinGame = async (e) => {
    e.preventDefault(); // Prevent default navigation initially

    if (!walletAddress) {
      alert("Connect your wallet first!");
      return;
    }

    try {
      await dispatch(joinGame({ gameId, walletAddress }));
      navigate(path); // Navigate after successful join
    } catch (error) {
      console.error("Error joining game:", error);
    }
  };

  return (
    <Link to={path} className={styles.gameCardLink} onClick={handleJoinGame}>
      <div className={styles.gameCard}>
        <div
          className={styles.gameImage}
          style={{ backgroundImage: `url(${imgSrc})` }}
        />
        <div className={styles.gameInfo}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
}

export default GameCard;
