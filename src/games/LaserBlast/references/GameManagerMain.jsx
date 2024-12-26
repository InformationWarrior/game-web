import React, { useEffect, useRef, useState } from "react";
import { UIManager } from "../scripts/UIManager";
import axios from "axios";

const GameManager = () => {
  const [uIManager, setUIManager] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const manager = new UIManager(canvasRef.current);
      setUIManager(manager);
    }
  }, []);

  const handleAddBall = async () => {
    try {
      const response = await axios.post("http://localhost:3000/game", {
        data: 1,
      });
      if (uIManager) {
        uIManager.addBall(response.data.point);
      }
    } catch (error) {
      console.error("Error adding ball:", error);
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} width="800" height="800"></canvas>
      <button onClick={handleAddBall}>Add ball</button>
    </div>
  );
};

export default GameManager;
