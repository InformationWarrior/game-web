import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setCredits } from "../../../Config/redux/slices/pachinkoSlice";
import "../styles/WalletDisplay.css";

function WalletDisplay() {
  const dispatch = useDispatch();
  const { credits, currency } = useSelector((state) => state.pachinko);

  const fetchCredits = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/laser-blast/wallet"
      );
      const { remainingCredits, currency } = response.data;

      // Dispatch the credits to Redux store
      dispatch(setCredits({ credits: remainingCredits, currency }));
    } catch (error) {
      console.error("Error fetching wallet data:", error);
      alert("Failed to fetch wallet data. Please try again.");
    }
  };

  // Fetch credits on component mount
  useEffect(() => {
    fetchCredits();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="credits-display">
      <p>
        <strong>Credits:</strong> {credits} {currency}
      </p>
    </div>
  );
}

export default WalletDisplay;
