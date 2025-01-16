import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GameDataTable from "./components/GameDataTable";
import BetOptions from "./components/BetOptions";
import { useUIManager } from "./hooks/useUIManager";
import ResponsiveCanvas from "./components/ResponsiveCanvas";
import dynamicConstants from "./scripts/dynamicConstants";
import {
  setWallet,
  setServerOutcome,
} from "../../redux/slices/laserBlastSlice";
import "./styles/LaserBlast.css";

function LaserBlast() {
  const dispatch = useDispatch();
  const { riskLevel, numberOfRows, wallet } = useSelector(
    (state) => state.laserBlast
  );

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const canvasRef = useRef(null);
  const uIManager = useUIManager(canvasRef, numberOfRows, riskLevel);

  // Handles ball dropping and delayed reward addition
  const handleDropBall = (point, reward) => {
    if (uIManager && point !== undefined) {
      uIManager.addBall(point, reward, () => {
        // Callback after ball hits the sink
        if (reward && reward > 0) {
          const updatedCredits = wallet.remainingCredits + reward;
          dispatch(
            setWallet({
              remainingCredits: updatedCredits,
              currency: wallet.currency,
            })
          );
        }
      });
    }
  };

  const handleCanvasResize = ({ width, height }) => {
    dynamicConstants.updateDimensions({ width, height });
  };

  return (
    <div className="laser-blast">
      <div className="laser-blast__main">
        {/* Game Panel */}
        <div className="laser-blast__game">
          <div className="laser-blast__panel">
            <div className="laser-blast__canvas">
              <ResponsiveCanvas
                canvasRef={canvasRef}
                onDimensionsChange={handleCanvasResize}
              />
            </div>
          </div>
        </div>

        {/* Bet Options */}
        <div className="laser-blast__bet-options">
          <BetOptions
            handleDropBall={handleDropBall}
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
          />
        </div>
      </div>

      {/* Game Data Table */}
      <div className="laser-blast__data">
        <GameDataTable />
      </div>
    </div>
  );
}

export default LaserBlast;
