import React, { useEffect, useRef, useState } from "react";
import "./styles/LaserBlast.css";
import GameDataTable from "./components/GameDataTable";
import BetOptions from "./components/BetOptions";
import { UIManager } from "./scripts/UIManager";
import { outcomes } from "./utils/outcomes";

function LaserBlast() {
  const [risk, setRisk] = useState("low");
  const [row, setRow] = useState(8);
  const [uIManager, setUIManager] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const manager = new UIManager(canvasRef.current, row, risk);
      setUIManager(manager);
    }
  }, [canvasRef]);

  useEffect(() => {
    if (uIManager) {
      uIManager.updateRows(row);
      uIManager.updateSinks(row, risk);
    }
  }, [row, risk, uIManager]);

  const handleRiskChange = (newRisk) => setRisk(newRisk);
  const handleRowChange = (newRow) => setRow(newRow);

  const handleDropBall = async () => {
    try {
      if (uIManager) {
        uIManager.addBall(outcomes[16][0]); //Outcome.js file ---> comes from backend.
      }
    } catch (error) {
      console.error("Error adding ball:", error);
    }
  };

  return (
    <div className="laser-blast">
      <div className="laser-blast__main">
        {/* Game Panel */}
        <div className="laser-blast__game">
          <div className="laser-blast__panel">
            <div className="laser-blast__panel-wrap">
              <div className="laser-blast__canvas">
                <canvas
                  ref={canvasRef}
                  width="800"
                  height="680"
                  // style={{ width: "800px", height: "680px" }}
                ></canvas>
              </div>
            </div>
          </div>
        </div>

        <div className="laser-blast__bet-options">
          <BetOptions
            risk={risk}
            row={row}
            onRiskChange={handleRiskChange}
            onRowChange={handleRowChange}
            handleDropBall={handleDropBall}
          />
        </div>
      </div>

      <div className="laser-blast__data">
        <GameDataTable />
      </div>
    </div>
  );
}

export default LaserBlast;
