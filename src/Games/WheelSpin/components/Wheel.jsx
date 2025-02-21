import React, { useRef, useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const colors = [
  "Red",
  "Green",
  "Yellow",
  "Orange",
  "Blue",
  "Purple",
  "Pink",
  "Cyan",
];

const Wheel = () => {
  const canvasRef = useRef(null);
  const gameState = useSelector((state) => state.wheelSpin.gameState);
  const bets = useSelector((state) => state.wheelSpin.bets);

  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState(null);
  const [showWinner, setShowWinner] = useState(false);

  // Default yellow wheel if no participants yet
  const participants =
    bets.length > 0
      ? bets.map((bet, index) => ({
          name: bet?.game?.participants?.[0]?.username || `Player ${index + 1}`, // Extract username safely
          color: colors[index % colors.length], // Assign color dynamically
        }))
      : [{ name: "Waiting...", color: "Yellow" }];

  useEffect(() => {
    drawWheel(rotation);
  }, [rotation, participants]);

  useEffect(() => {
    if (gameState === "RUNNING") {
      startSpin();
    }
  }, [gameState]);

  const drawWheel = (angle) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const radius = canvas.width / 2;
    const sliceAngle = (2 * Math.PI) / participants.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(angle * (Math.PI / 180));

    participants.forEach((participant, i) => {
      const startAngle = i * sliceAngle;
      const endAngle = (i + 1) * sliceAngle;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = participant.color;
      ctx.fill();
      ctx.stroke();

      // Add text inside the slice
      ctx.fillStyle = "white";
      ctx.font = "bold 16px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const textAngle = startAngle + sliceAngle / 2;
      const textX = (radius / 1.5) * Math.cos(textAngle);
      const textY = (radius / 1.5) * Math.sin(textAngle);
      ctx.save();
      ctx.rotate(textAngle);
      // ctx.fillText(participant.name, textX, textY); // Show player names or "Waiting..."
      ctx.restore();
    });

    // Draw Inner Circle (Center)
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.65, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  };

  const startSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setWinner(null);
    setShowWinner(false);

    let spinTime = 3000;
    let startRotation = rotation;
    let finalRotation = startRotation + 720 + Math.random() * 360;
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      let progress = (timestamp - startTime) / spinTime;
      let easeProgress = progress < 1 ? 1 - Math.pow(1 - progress, 3) : 1;
      let currentRotation =
        startRotation + (finalRotation - startRotation) * easeProgress;

      setRotation(currentRotation);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        determineWinner(currentRotation);
      }
    };

    requestAnimationFrame(animate);
  };

  const determineWinner = (finalRotation) => {
    if (participants.length === 0) return;

    const sliceAngle = 360 / participants.length;
    const winningIndex = Math.floor(
      ((360 - (finalRotation % 360)) / sliceAngle) % participants.length
    );
    const winnerName = participants[winningIndex].name;
    setWinner(winnerName);
    setShowWinner(true);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.7 },
    });

    setTimeout(() => setShowWinner(false), 5000);
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
          fontSize: "50px",
          color: "red",
          zIndex: 10,
        }}
      />

      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        style={{ borderRadius: "50%", border: "2px solid black" }}
      />

      {showWinner && winner && (
        <div
          style={{
            position: "fixed",
            top: "50%",
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
          <h3>{winner}</h3>
        </div>
      )}
    </div>
  );
};

export default Wheel;
