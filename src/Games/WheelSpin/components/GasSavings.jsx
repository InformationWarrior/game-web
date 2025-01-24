import React from "react";
import { useSelector } from "react-redux";

function GasSavings() {
  const { betAmount, totalPlayerRounds, currency } = useSelector(
    (state) => state.wheelSpin
  );

  const totalEntry = betAmount * totalPlayerRounds; // Total Entry
  const discountRate = 0.1; // Example: 10% discount
  const gasSavings = totalEntry * discountRate; // Calculate savings

  return (
    <div>
      <div className="mb-3">
        <h6 className="fw-bold mb-1">Total Entry</h6>
        <p className="text-white">
          ( ${totalEntry.toFixed(2)} ){" "}
          <span className="text-white">
            {totalEntry.toFixed(4)} {currency}
          </span>
        </p>
      </div>
      <div className="mb-4">
        <h6 className="fw-bold mb-1">Est. Gas Savings:</h6>
        <p className="text-white">
          ( ${gasSavings.toFixed(2)} ){" "}
          <span className="text-white">
            {gasSavings.toFixed(4)} {currency}
          </span>
        </p>
      </div>
    </div>
  );
}

export default GasSavings;
