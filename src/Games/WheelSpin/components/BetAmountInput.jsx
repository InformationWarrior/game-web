import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEthereum, FaDice } from "react-icons/fa";
import { setBetAmount } from "../../../Common/redux/slices/wheelSpinSlice";

function BetAmountInput() {
  const dispatch = useDispatch();
  const { betAmount, credits, currency } = useSelector(
    (state) => state.wheelSpin
  );

  const [inputValue, setInputValue] = useState(betAmount.toString()); // Local state for input

  const handleBetAmountChange = (event) => {
    const value = event.target.value;

    // Allow empty input for editing
    if (value === "") {
      setInputValue("");
      return;
    }

    // Parse value as float and enforce minimum limit
    const parsedValue = parseFloat(value);

    if (isNaN(parsedValue) || parsedValue < 0.01) {
      setInputValue("0.01");
      dispatch(setBetAmount(0.01));
    } else {
      setInputValue(parsedValue.toString());
      dispatch(setBetAmount(parsedValue));
    }
  };

  const handlePresetValueClick = (value) => {
    setInputValue(value.toString());
    dispatch(setBetAmount(value));
  };

  // Calculate remaining credits based on bet amount
  const remainingCredits = credits - betAmount;

  return (
    <>
      <h6 className="fw-bold mb-2">ETH entry per round</h6>
      <div className="bet-amount-input-container">
        <div className="input-group mb-2 w-100">
          <input
            id="bet-input"
            className="bet-amount-input__input w-100 form-control bg-secondary text-white"
            placeholder="0.01"
            value={inputValue} // Local input state
            onChange={handleBetAmountChange} // Update Redux and local state
          />
        </div>
        <div className="d-flex gap-2">
          {/* Buttons for preset values */}
          <button
            className="btn btn-outline-secondary eth-btn"
            onClick={() => handlePresetValueClick(0.01)}
          >
            <FaEthereum /> 0.01
          </button>
          <button
            className="btn btn-outline-secondary eth-btn"
            onClick={() => handlePresetValueClick(0.05)}
          >
            <FaEthereum /> 0.05
          </button>
          <button
            className="btn btn-outline-secondary eth-btn"
            onClick={() => handlePresetValueClick(0.1)}
          >
            <FaEthereum /> 0.1
          </button>
          <button
            className="btn btn-outline-secondary eth-btn"
            onClick={() =>
              handlePresetValueClick(
                Math.min(credits, Math.random() * 0.1).toFixed(2)
              )
            }
          >
            <FaDice />
          </button>
        </div>
        <p className="text-white mt-2">
          {currency} in wallet:{" "}
          <span className="text-white">
            {remainingCredits < 0
              ? "Insufficient funds"
              : `( $${remainingCredits.toFixed(
                  2
                )} ) ${remainingCredits} ${currency}`}
          </span>
        </p>
      </div>
    </>
  );
}

export default BetAmountInput;
