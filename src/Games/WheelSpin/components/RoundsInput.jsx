import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { FaQuestionCircle } from "react-icons/fa";
import { setCurrentPlayerRound } from "../../../Common/redux/slices/wheelSpinSlice";
import "../styles/RoundsInput.css";

function RoundsInput() {
  const dispatch = useDispatch();
  const { currentPlayerRound } = useSelector((state) => state.wheelSpin);

  const [inputValue, setInputValue] = useState(currentPlayerRound || 1); // Default value is 1

  const handleIncrement = () => {
    if (inputValue < 10) {
      const newValue = inputValue + 1;
      setInputValue(newValue);
      dispatch(setCurrentPlayerRound(newValue));
    }
  };

  const handleDecrement = () => {
    if (inputValue > 1) {
      const newValue = inputValue - 1;
      setInputValue(newValue);
      dispatch(setCurrentPlayerRound(newValue));
    }
  };

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value, 10);

    if (isNaN(value)) {
      setInputValue(""); // Allow empty input
      return;
    }

    if (value >= 1 && value <= 10) {
      setInputValue(value);
      dispatch(setCurrentPlayerRound(value));
    } else {
      setInputValue(inputValue); // Reset to previous valid value
    }
  };

  const handleMaxClick = () => {
    setInputValue(10);
    dispatch(setCurrentPlayerRound(10));
  };

  return (
    <>
      {/* TODO */}
      {/* Add pop over later */}
      {/* <h6 className="fw-bold mb-2 d-flex align-items-center gap-1">
        Number of Rounds <FaQuestionCircle className="text-white" />
      </h6> */}
      <h6 className="fw-bold mb-2 d-flex align-items-center gap-1">
        Number of Rounds
      </h6>
      <div className="d-flex align-items-center gap-2">
        <button
          className="btn btn-outline-secondary round-control-btn"
          onClick={handleDecrement}
          disabled={inputValue <= 1}
        >
          -
        </button>
        <input
          type="number"
          className="form-control bg-secondary border-0 text-white text-center rounds-input"
          value={inputValue}
          onChange={handleInputChange}
          min={1}
          max={10}
        />
        <button
          className="btn btn-outline-secondary round-control-btn"
          onClick={handleIncrement}
          disabled={inputValue >= 10}
        >
          +
        </button>
        <button
          className="btn btn-outline-secondary max-btn"
          onClick={handleMaxClick}
        >
          Max
        </button>
      </div>
    </>
  );
}

export default RoundsInput;
