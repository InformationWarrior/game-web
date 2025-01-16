import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setWallet } from "../../../redux/slices/laserBlastSlice";

function ConnectButton() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3001/api/laser-blast/wallet"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch wallet data.");
      }
      const walletData = await response.json();
      console.log("Fetched wallet data:", walletData); // Debug log
      dispatch(setWallet(walletData)); // Set wallet data in Redux
      alert("Wallet connected successfully!");
    } catch (error) {
      console.error("Error fetching wallet data:", error);
      alert("Failed to connect to wallet.");
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <button
      className="laser-blast__connect-btn"
      onClick={handleConnect}
      disabled={loading} // Disable button while loading
    >
      {loading ? "Connecting..." : "Connect Wallet"}
    </button>
  );
}

export default ConnectButton;
