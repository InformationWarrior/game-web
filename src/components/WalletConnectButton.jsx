import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const WalletConnectButton = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <ConnectButton />
    </div>
  );
};

export default WalletConnectButton;
