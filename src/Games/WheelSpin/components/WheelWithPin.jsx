import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell } from "recharts";
import { useSelector, useDispatch } from "react-redux";
import {
  setGameState,
  setInGameMessage,
} from "../../../Config/redux/slices/wheelSpinSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import SpinWheel from "../../../styles/WheelSpin/SpinWheel.module.css";
// Define prizes and colors
const segments = ["Player 1", "Player 2", "Player 3"];

const data = [
  { name: "Player 1", value: 25, fill: "red" },
  { name: "Player 2", value: 40, fill: "yellow" },
  { name: "Player 3", value: 35, fill: "blue" },
];

const segmentAngle = 360 / segments.length; // Angle per segment

export default function WheelWithPin() {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.wheelSpin.gameState);

  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [tooltipContent, setTooltipContent] = useState("Spin the Wheel!");

  const wheelRef = useRef(null);
  const pinRef = useRef(null);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setTooltipContent(null);

    const spins = Math.floor(Math.random() * 3 + 5); // Random full spins (5-7)
    const randomAngle = Math.random() * segmentAngle; // Random stop angle within a segment
    const totalRotation = spins * 360 + randomAngle;

    setRotation((prev) => prev + totalRotation);

    setTimeout(() => {
      console.log("stopped");
      getWinner(totalRotation);
      setIsSpinning(false);
    }, 4000);
  };

  useEffect(() => {
    if (gameState === "SPINNING") {
      spinWheel();
    }
  }, [gameState]);

  const getWinner = (totalRotation) => {
    // Calculate the position of the pin after rotation
    const pinRect = pinRef.current.getBoundingClientRect();
    const wheelRect = wheelRef.current.getBoundingClientRect();

    // Pin's position relative to the wheel
    const pinCenterX = pinRect.left + pinRect.width / 2;
    const pinCenterY = pinRect.top + pinRect.height / 2;
    const wheelCenterX = wheelRect.left + wheelRect.width / 2;
    const wheelCenterY = wheelRect.top + wheelRect.height / 2;
    console.log({ pinCenterX, pinCenterY });
    console.log({ wheelCenterX, wheelCenterY });

    // Use the function to get the color of the segment the pin is pointing to
    // const color = getSegmentColor(wheelCenterX, wheelCenterY, pinCenterX, pinCenterY);
    // console.log({ color });

    const color = getSegmentColorByCoords(
      wheelRef,
      671.6458740234375,
      139.7916717529297
    );
    console.log({ color });

    // Calculate the angle between the wheel center and pin center
    const angle =
      Math.atan2(pinCenterY - wheelCenterY, pinCenterX - wheelCenterX) *
      (180 / Math.PI);

    // Normalize angle to [0, 360]
    const normalizedAngle = (angle + 360) % 360;

    // Calculate the final angle of the wheel after rotation
    const finalAngle = totalRotation % 360;

    // Calculate the adjusted angle (pin's final position) considering both rotation and pin angle
    const adjustedAngle = (finalAngle + normalizedAngle) % 360;

    // Determine which segment the pin is pointing to
    const winningIndex = Math.floor(adjustedAngle / segmentAngle);
    console.log(data[winningIndex]);

    // Get the winning prize based on the calculated index
    const winningPrize = segments[winningIndex];
    dispatch(setInGameMessage(`${winningPrize} won`));
    dispatch(setGameState("RESET"));
    setTooltipContent(`${winningPrize} won`); // Display the winning prize
  };

  // Function to calculate the segment color based on pin position
  // function getSegmentColor(centerX, centerY, pinX, pinY) {
  //   // Calculate angle between wheel center and pin position
  //   const angle = Math.atan2(pinY - centerY, pinX - centerX) * (180 / Math.PI);

  //   // Normalize the angle to [0, 360]
  //   const normalizedAngle = (angle + 360) % 360;

  //   // Determine which segment the pin is pointing to
  //   const segmentIndex = Math.floor(normalizedAngle / segmentAngle);

  //   const wheelRect = wheelRef.current.getBoundingClientRect();
  //   // Return the color based on the calculated segment
  //   return data[segmentIndex].fill;
  // }

  // Function to calculate the color based on wheel center and passed coordinates (x, y)
  function getSegmentColorByCoords(wheelRef, x, y) {
    const wheelRect = wheelRef.current.getBoundingClientRect();
    const canvas = wheelRef.current.querySelector("canvas");

    if (!canvas) {
      console.error("Canvas element not found in wheel.");
      return null;
    }

    const ctx = canvas.getContext("2d");

    // Adjust coordinates based on wheel offset within the window
    const offsetX = x - wheelRect.left;
    const offsetY = y - wheelRect.top;

    // Get the pixel data at the specified (x, y)
    const pixel = ctx.getImageData(offsetX, offsetY, 1, 1).data;

    // Convert the pixel data to an RGB color
    const color = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    return color;
  }

  function getAngle(x, y, wheelRef) {
    const wheelRect = wheelRef.current.getBoundingClientRect();
    const wheelCenterX = wheelRect.left + wheelRect.width / 2;
    const wheelCenterY = wheelRect.top + wheelRect.height / 2;

    // Calculate angle between the center and the point (x, y)
    const dx = x - wheelCenterX;
    const dy = y - wheelCenterY;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    const normalizedAngle = (angle + 360) % 360; // Normalize to [0, 360] range
    return normalizedAngle;
  }

  // Function to get the segment color based on the click position (x, y)
  function getSegmentColor(x, y, wheelRef) {
    const angle = getAngle(x, y, wheelRef);
    const segmentIndex = Math.floor(angle / segmentAngle);
    return data[segmentIndex].fill;
  }

  const handleMouseClick = (e) => {
    // Get the clicked position (x, y)
    const x = e.clientX;
    const y = e.clientY;

    // Get the color of the segment based on the (x, y) coordinates using canvas
    const color = getSegmentColor(x, y, wheelRef);
    console.log("Segment color at clicked position:", color);
  };

  return (
    <div className={SpinWheel.wheel}>
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Pin Image */}
        <FontAwesomeIcon
          ref={pinRef}
          icon={faLocationPin}
          style={{
            zIndex: 3,
            fontSize: "3rem",
            position: "absolute",
            top: "5%", // Pin is now placed at the center vertically
            left: "50%", // Pin is now placed at the center horizontally
            transform: "translate(-50%, -100%)", // Adjust to make the pin point to the top center
            color: "red",
          }}
        />
        {/* Wheel */}
        <div
          style={{
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            border: "3px solid yellow",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <motion.div
            ref={wheelRef}
            onClick={handleMouseClick}
            animate={{ rotate: rotation }}
            transition={{ duration: 4, ease: "easeOut" }}
            style={{
              width: "300px",
              height: "300px",
              position: "absolute",
              top: "0",
              left: "0",
              zIndex: 1,
            }}
          >
            <PieChart width={300} height={300}>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={150}
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
            {/* We need to create a canvas element that we can draw the pie chart on */}
            <canvas
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none", // This ensures the canvas doesn't interfere with the mouse click
              }}
              width={300}
              height={300}
            >
              {/* Canvas content rendered by the Pie chart */}
            </canvas>
          </motion.div>

          {/* Center Text */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 2,
              textAlign: "center",
              fontSize: "20px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            {tooltipContent}
          </div>
        </div>
      </div>
    </div>
  );
}
