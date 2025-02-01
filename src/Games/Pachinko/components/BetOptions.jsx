import React from "react";
import { useDispatch, useSelector } from "react-redux";
import laserBlastLogo from "../assets/thumbnail.webp";
import BetButton from "./BetButton";
import EntrySection from "./EntrySection";
import {
  setRiskLevel,
  setNumberOfRows,
} from "../../../Config/redux/slices/pachinkoSlice";
import "../styles/BetOptions.css";
import WalletDisplay from "./WalletDisplay";

function BetOptions(props) {
  const { handleDropBall, dropdownOpen, setDropdownOpen } = props;

  const dispatch = useDispatch();
  const { riskLevel, numberOfRows } = useSelector((state) => state.laserBlast);

  const handleRiskChange = (event) => {
    const value = parseInt(event.target.value, 10);
    const riskLevels = ["low", "medium", "high"];
    dispatch(setRiskLevel(riskLevels[value]));
  };

  const handleRowChange = (event) => {
    const value = parseInt(event.target.value, 10);
    dispatch(setNumberOfRows(value));
  };

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <div className="laser-blast__bet-panel">
      <div className="laser-blast__bet-container">
        <div className="laser-blast__bet-main">
          {/* Logo Section */}
          <div className="laser-blast__bet-logo">
            <img src={laserBlastLogo} alt="LaserBlast Logo" />
          </div>

          {/* Wallet Display Section */}
          <WalletDisplay />

          {/* Entry Section */}
          <EntrySection
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
          />

          {/* Risk Level Section */}
          <div className="laser-blast__bet-risk">
            <label className="laser-blast__label" htmlFor="risk-slider">
              Risk Level
            </label>
            <div className="laser-blast__slider">
              <span className="laser-blast__slider-label">
                {capitalize(riskLevel)}
              </span>
              <input
                type="range"
                id="risk-slider"
                className="laser-blast__range-input"
                min={0}
                max={2}
                step={1}
                value={["low", "medium", "high"].indexOf(riskLevel)}
                onChange={handleRiskChange}
              />
            </div>
          </div>

          {/* Rows Section */}
          <div className="laser-blast__bet-rows">
            <label className="laser-blast__label" htmlFor="row-slider">
              Rows
            </label>
            <div className="laser-blast__slider">
              <span className="laser-blast__slider-label">{numberOfRows}</span>
              <input
                type="range"
                id="row-slider"
                className="laser-blast__range-input"
                min={8}
                max={16}
                value={numberOfRows}
                onChange={handleRowChange}
              />
            </div>
          </div>
        </div>

        {/* Connect Section */}
        {/* <ConnectButton /> */}

        {/* Play Button Section */}
        <div className="laser-blast__bet-connect">
          <BetButton handleDropBall={handleDropBall} />
        </div>
      </div>
    </div>
  );
}

export default BetOptions;
