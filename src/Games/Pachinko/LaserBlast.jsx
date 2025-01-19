import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GameDataTable from "./components/GameDataTable";
import BetOptions from "./components/BetOptions";
import { useUIManager } from "./hooks/useUIManager";
import ResponsiveCanvas from "./components/ResponsiveCanvas";
import dynamicConstants from "./scripts/dynamicConstants";
import { setCredits } from "../../Common/redux/slices/laserBlastSlice";
import "./styles/LaserBlast.css";

function LaserBlast() {
  const dispatch = useDispatch();
  const { riskLevel, numberOfRows, credits, currency, betAmount } = useSelector(
    (state) => state.laserBlast
  );

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const canvasRef = useRef(null);
  const uIManager = useUIManager(canvasRef, numberOfRows, riskLevel);

  const handleDropBall = (point, payout) => {
    if (uIManager && point) {
      uIManager.addBall(point, payout, (index, startX, payout) => {
        const updatedCredits = parseFloat(
          (Number(credits) - Number(betAmount) + Number(payout)).toFixed(2)
        );
        dispatch(setCredits({ credits: updatedCredits, currency }));
      });
    }
  };

  const handleCanvasResize = ({ width, height }) => {
    dynamicConstants.updateDimensions({ width, height });
  };

  return (
    <div className="laser-blast">
      <div className="laser-blast__main">
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

        <div className="laser-blast__bet-options">
          <BetOptions
            handleDropBall={handleDropBall}
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
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
