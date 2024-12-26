import React, { useEffect, useRef, useState } from "react";
import "./styles/LaserBlast.css";
import GameDataTable from "./components/GameDataTable";
import BetOptions from "./components/BetOptions";
import { UIManager } from "./scripts/UIManager";

function LaserBlast() {
  const [risk, setRisk] = useState("low");
  const [row, setRow] = useState(8);
  const [shots, setShots] = useState(5);
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
  const handleShotsChange = (newShots) => setShots(newShots);

  const handleDropBall = async () => {
    try {
      if (uIManager) {
        uIManager.addBall(3953045.1447091424); //Outcome.js file ---> comes from backend.
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
                  height="600"
                  // style={{ width: "748px", height: "561px" }}
                ></canvas>
              </div>
            </div>
          </div>
        </div>

        <div className="laser-blast__bet-options">
          <BetOptions
            risk={risk}
            row={row}
            shots={shots}
            onRiskChange={handleRiskChange}
            onRowChange={handleRowChange}
            onShotsChange={handleShotsChange}
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
