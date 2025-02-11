import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { enterGame } from "../../Config/redux/slices/betsSlice";
import styles from "../../styles/BETS/Games.module.css";

function GameCard({ title, description, imgSrc, path, gameId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const walletAddress = useSelector((state) => state.bets.wallet.address);

  const handleEnterGame = async (e) => {
    e.preventDefault(); // Prevent default navigation initially

    if (!walletAddress) {
      alert("Connect your wallet first!");
      return;
    }

    try {
      await dispatch(enterGame({ gameId, walletAddress })).unwrap();
      navigate(path); // Navigate after successful entry
    } catch (error) {
      console.error("Error entering game:", error);
    }
  };

  return (
    <Link to={path} className={styles.gameCardLink} onClick={handleEnterGame}>
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
