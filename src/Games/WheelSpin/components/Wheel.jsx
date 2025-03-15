import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import {
  winnerDetermined,
  RoundUpdates,
} from "../../../Config/redux/slices/betsActions";
import { drawWheel, spinWheel, determineWinner } from "../Utils/wheelUtils";

// const colors = [
//   "Red",
//   "Green",
//   "Yellow",
//   "Orange",
//   "Blue",
//   "Purple",
//   "Pink",
//   "Cyan",
// ];

const Wheel = () => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const gameState = useSelector((state) => state.wheelSpin.gameState);
  const gameId = useSelector((state) => state.bets.gameId);
  const bets = useSelector((state) => state.bets.bets) || [];
  const participants = useSelector((state) => state.bets.participants) || [];
  const winnerFromStore = useSelector((state) => state.bets.winner); // Fetch winner from Redux

  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState(null);
  const [showWinner, setShowWinner] = useState(false);
  const [size, setSize] = useState(400); // Default size for large screens

  useEffect(() => {
    const updateCanvasSize = () => {
      const width = window.innerWidth;
      setSize(width <= 425 ? 200 : width <= 768 ? 300 : 400);
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  useEffect(() => {
    if (gameId) {
      const unsubscribeWinner = dispatch(winnerDetermined(gameId));
      const unsubscribeRound = dispatch(RoundUpdates(gameId));

      return () => {
        unsubscribeWinner();
        unsubscribeRound();
      };
    }
  }, [dispatch, gameId]);

  useEffect(() => {
    if (winnerFromStore) {
      console.log("Winner Data from Redux:", winnerFromStore.winner.username); // Debug log
      setWinner(winnerFromStore);
      setShowWinner(true);
    }
  }, [winnerFromStore]);

  useEffect(() => {
    if (gameState === "RESET") resetWheel();
  }, [gameState]);

  const participantsBets = participants.length
    ? participants.map((bet, index) => ({
        name: bet.username,
        color: bet.color,
        // color: colors[index % colors.length],
      }))
    : [{ name: "Waiting...", color: "Yellow" }];

  useEffect(() => {
    drawWheel(canvasRef.current, rotation, participantsBets);
  }, [participants, bets, rotation]);

  useEffect(() => {
    if (gameState === "RUNNING" && participantsBets.length > 1) {
      spinWheel(
        rotation,
        setRotation,
        setSpinning,
        participantsBets,
        (rotation) =>
          determineWinner(rotation, participantsBets, setWinner, setShowWinner)
      );
    }
  }, [gameState]);

  const resetWheel = () => {
    setRotation(0);
    setWinner(null);
    setShowWinner(false);
    drawWheel(canvasRef.current, 0, participantsBets);
  };

  return (
    <div
      style={{
        textAlign: "center",
        position: "relative",
        display: "inline-block",
      }}
    >
      <FontAwesomeIcon
        icon={faLocationPin}
        style={{
          position: "absolute",
          top: "50%",
          right: "-35px",
          transform: "translateY(-50%) rotate(90deg)",
          fontSize: size === 400 ? "60px" : "50px",
          color: "red",
          zIndex: 10,
        }}
      />

      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        style={{ borderRadius: "50%", border: "2px solid black" }}
      />

      {showWinner && winner && (
        <div
          style={{
            position: "fixed",
            top: size === 400 ? "55%" : "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            color: "#006400",
            padding: "1rem 2rem",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            textAlign: "center",
            zIndex: 1000,
          }}
        >
          <h2>🎉 Congratulations! 🎉</h2>
          <h3>{winnerFromStore.winner.username}</h3>
        </div>
      )}
    </div>
  );
};

export default Wheel;
