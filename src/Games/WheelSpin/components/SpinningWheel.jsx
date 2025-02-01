import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell } from "recharts";
import { useSelector, useDispatch } from "react-redux";
import {
  setGameState,
  setInGameMessage,
} from "../../../Common/redux/slices/wheelSpinSlice";

export default function SpinningWheel() {
  const wheelMessage = 'Spin the Wheel!'
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.wheelSpin.gameState);

  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [tooltipContent, setTooltipContent] = useState(wheelMessage);

  // Define the prizes and colors
  const segments = ["Prize 1", "Prize 2", "Prize 3"];

  const data = [
    { name: "Prize 1", value: 25, fill: "#02B2AF" },
    { name: "Prize 2", value: 40, fill: "#2E96FF" },
    { name: "Prize 3", value: 35, fill: "#B800D8" },
  ];

  const segmentAngle = 360;

  // Spin the wheel function
  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setTooltipContent(null)
    const spins = Math.floor(Math.random() * 3 + 5); // Random spins between 5 and 7
    const randomAngle = Math.random() * segmentAngle;
    const totalRotation = spins * 360 + randomAngle;

    setRotation((prev) => prev + totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const selectedSegment =
        Math.floor(((totalRotation % 360) + segmentAngle / 2) / segmentAngle) %
        segments.length;

      // Dispatch winner message
      const prize = segments[selectedSegment];
      dispatch(setInGameMessage(`You won: ${prize}`));
      dispatch(setGameState("RESET")); // Transition to RESET state
      setTooltipContent(wheelMessage)
    }, 4000); // Matches animation duration
  };

  // Spin the wheel when the gameState changes to SPINNING
  useEffect(() => {
    if (gameState === "SPINNING") {
      spinWheel();
    }
  }, [gameState]); // Triggered when gameState changes

  // Handle mouse enter for individual cells
  const handleMouseEnter = (name) => {
    setTooltipContent(name); // Set the content to the prize name on hover
  };

  // Handle mouse leave for individual cells
  const handleMouseLeave = () => {
    setTooltipContent(wheelMessage); // Reset to default text when hover leaves
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          border: '3px solid yellow',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Motion div only for Pie slices */}
        <motion.div
          animate={{ rotate: rotation }}
          transition={{ duration: 4, ease: 'easeOut' }}
          style={{
            width: '300px',
            height: '300px',
            position: 'absolute',
            top: '0',
            left: '0',
            zIndex: 1,  // Ensure slices are on top of the static center
          }}
        >
          <PieChart width={300} height={300}>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={80} // Create a hole in the center (adjust this value for different ring thickness)
              outerRadius={150} // Outer radius for the ring
              startAngle={90}  // Start angle to match your design
              endAngle={-270}  // End angle to complete the circle
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.fill}
                  onMouseEnter={() => handleMouseEnter(entry.name)} // Handle hover for individual cells
                  onMouseLeave={handleMouseLeave} // Reset when leaving hover
                />
              ))}
            </Pie>
          </PieChart>
        </motion.div>

        {/* Center part stays static with dynamic tooltip content */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,  // Ensure center is above the rotating slices
            textAlign: 'center',
            fontSize: '20px',
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          {tooltipContent}
        </div>
      </div>

      <p
        style={{
          marginTop: "20px",
          fontSize: "16px",
          color: isSpinning ? "#6c757d" : "#000",
          textAlign: "center",
        }}
      >
        .
      </p>
    </div>
  );
}
