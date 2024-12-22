import React, { useEffect, useState } from "react";
import {
  HEIGHT,
  WIDTH,
  NUM_SINKS,
  obstacleRadius,
  sinkWidth,
  MULTIPLIERS,
} from "./constants";
import { pad } from "./padding";

const PlinkoBoard = () => {
  const [obstacles, setObstacles] = useState([]);
  const [sinks, setSinks] = useState([]);

  // Function to create obstacles
  const createObstacles = () => {
    const obstacles = [];
    const rows = 18;

    for (let row = 2; row < rows; row++) {
      const numObstacles = row + 1;
      const y = 0 + row * 35;
      const spacing = 36;

      for (let col = 0; col < numObstacles; col++) {
        const x = WIDTH / 2 - spacing * (row / 2 - col);
        obstacles.push({ x: pad(x), y: pad(y), radius: obstacleRadius });
      }
    }
    return obstacles;
  };

  // Function to create sinks
  const createSinks = () => {
    const sinks = [];
    const SPACING = obstacleRadius * 2;

    for (let i = 0; i < NUM_SINKS; i++) {
      const x =
        WIDTH / 2 + sinkWidth * (i - Math.floor(NUM_SINKS / 2)) - SPACING * 1.5;
      const y = HEIGHT - 170;
      const width = sinkWidth;
      const height = width;
      sinks.push({ x, y, width, height, multiplier: MULTIPLIERS[i + 1] });
    }

    return sinks;
  };

  // Initialize board on mount
  useEffect(() => {
    setObstacles(createObstacles());
    setSinks(createSinks());
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: `${WIDTH}px`,
        height: `${HEIGHT}px`,
        border: "2px solid black",
        background: "#f5f5f5",
        margin: "20px auto",
      }}
    >
      {/* Render obstacles */}
      {obstacles.map((obstacle, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: `${obstacle.x}px`,
            top: `${obstacle.y}px`,
            width: `${obstacle.radius * 2}px`,
            height: `${obstacle.radius * 2}px`,
            backgroundColor: "gray",
            borderRadius: "50%",
          }}
        ></div>
      ))}

      {/* Render sinks */}
      {sinks.map((sink, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: `${sink.x}px`,
            top: `${sink.y}px`,
            width: `${sink.width}px`,
            height: `${sink.height}px`,
            backgroundColor: "blue",
            border: "1px solid black",
            textAlign: "center",
            lineHeight: `${sink.height}px`,
            color: "white",
          }}
        >
          {sink.multiplier}x
        </div>
      ))}
    </div>
  );
};

export default PlinkoBoard;
