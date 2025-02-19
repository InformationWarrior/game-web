import React, { useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useDispatch } from "react-redux";
import { createPlayer } from "../../Config/redux/slices/betsSlice";
import { useAccount, useBalance } from "wagmi";

const CustomConnectButton = () => {
  const dispatch = useDispatch();
  const { address, isConnected } = useAccount();
  const { data: balanceData } = useBalance({ address });

  useEffect(() => {
    if (isConnected && address && balanceData) {
      const walletInfo = {
        walletAddress: address,
        username: `User_${address.slice(-4)}`,
        balance: parseFloat(balanceData.formatted),
        currency: balanceData.symbol,
      };

      console.log("🚀 Dispatching createPlayer with:", walletInfo);
      dispatch(createPlayer(walletInfo));
    }
  }, [isConnected, address, balanceData, dispatch]);

  return <ConnectButton />;
};

export default CustomConnectButton;
