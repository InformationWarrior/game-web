import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEthereum, FaDice } from "react-icons/fa";
import {
  setBetAmount,
  setWalletAmount,
  setCurrency,
} from "../../../Common/redux/slices/wheelSpinSlice";

function BetAmountInput() {
  const dispatch = useDispatch();
  const { betAmount, walletAmount, currency, totalPlayerRounds } = useSelector(
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

  // Handle dropdown selection change
  const handleCurrencyChange = (event) => {
    const selectedCurrency = event.target.value;
    dispatch(setCurrency(selectedCurrency)); // Update currency in Redux
  };

  // Calculate total bet amount
  const totalBetAmount = betAmount * totalPlayerRounds;

  // Calculate remaining credits dynamically
  const remainingCredits = walletAmount - totalBetAmount;

  // Check if the user has sufficient balance
  const hasSufficientBalance = remainingCredits >= 0;

  return (
    <>
      <div className="d-flex align-items-center mb-2">
        <h6 className="fw-bold mb-0">
          {/* ETH entry with dropdown */}
          <span>
            <select
              className="form-select d-inline-block bg-transparent text-white fw-bold border-0 p-0"
              value={currency}
              onChange={handleCurrencyChange}
              style={{
                width: "auto",
                appearance: "none",
                cursor: "pointer",
              }}
            >
              <option value="ETH">ETH</option>
              <option value="BETS">BETS</option>
            </select>
          </span>
          - per round
        </h6>
      </div>
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
                Math.min(walletAmount, Math.random() * 0.1).toFixed(2)
              )
            }
          >
            <FaDice />
          </button>
        </div>
        <p className="text-white mt-2">
          {currency} in wallet:{" "}
          <span className="text-white">
            {hasSufficientBalance
              ? `( $${remainingCredits.toFixed(2)} remaining )`
              : "Insufficient Balance"}
          </span>
        </p>
        <p className="text-white mt-2">
          Total Bet:
          <span className="text-warning">
            {` ${totalBetAmount.toFixed(4)} ${currency}`}
          </span>
        </p>
      </div>
    </>
  );
}

export default BetAmountInput;
