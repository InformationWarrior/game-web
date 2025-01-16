import React from "react";
import { useSelector } from "react-redux";
import { FaBitcoin } from "react-icons/fa"; // Example for the coin icon
import "../styles/WalletDisplay.css";

function WalletDisplay() {
  const wallet = useSelector((state) => state.laserBlast.wallet);

  if (!wallet || wallet.remainingCredits === undefined) {
    return <div>Loading wallet data...</div>;
  }

  const { remainingCredits, currency } = wallet;

  return (
    <div className="wallet-display">
      <div className="wallet-amount">
        {remainingCredits.toFixed(2)}
        {/* <FaBitcoin className="wallet-icon" /> */}
        <span className="wallet-currency">{currency}</span>
      </div>
      <button className="wallet-button">Wallet</button>
    </div>
  );
}

export default WalletDisplay;
