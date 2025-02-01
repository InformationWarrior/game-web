import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TiArrowSortedDown } from "react-icons/ti";
import {
  setCurrency,
  setBetAmount,
} from "../../../Config/redux/slices/pachinkoSlice";

function EntrySection({ dropdownOpen, setDropdownOpen }) {
  const dispatch = useDispatch();
  const { currency, betAmount } = useSelector((state) => state.laserBlast);

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

  const handleCurrencyChange = (selectedCurrency) => {
    dispatch(setCurrency(selectedCurrency));
    setDropdownOpen(false); // Close dropdown after selecting a currency
  };

  return (
    <div className="laser-blast__bet-entry">
      <label htmlFor="entry-input" className="laser-blast__label">
        Entry
      </label>
      <div className="laser-blast__entry-input-container">
        <div className="laser-blast__dropdown-input">
          <input
            id="entry-input"
            className="laser-blast__entry-input"
            placeholder="0.01"
            value={inputValue} // Local input state
            onChange={handleBetAmountChange} // Update Redux and local state
          />
          <div className="laser-blast__dropdown-container">
            <button
              className="laser-blast__dropdown-button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {currency} {/* Display selected currency */}
              <i className="laser-blast__dropdown-icon">
                <TiArrowSortedDown />
              </i>
            </button>
            {dropdownOpen && (
              <ul className="laser-blast__dropdown-menu">
                {["USDT", "BETS", "ETH"].map((currency) => (
                  <li
                    key={currency}
                    className="laser-blast__dropdown-item"
                    onClick={() => handleCurrencyChange(currency)}
                  >
                    {currency}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="laser-blast__entry-buttons">
        <button
          onClick={() => {
            const newAmount = Math.max(betAmount / 2, 0.01);
            setInputValue(newAmount.toString());
            dispatch(setBetAmount(newAmount));
          }}
        >
          ½
        </button>
        <button
          onClick={() => {
            const newAmount = betAmount * 2;
            setInputValue(newAmount.toString());
            dispatch(setBetAmount(newAmount));
          }}
        >
          x2
        </button>
      </div>
    </div>
  );
}

export default EntrySection;
