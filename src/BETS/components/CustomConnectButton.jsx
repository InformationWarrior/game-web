import React, { useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useDispatch } from "react-redux";
import { saveWalletData, createPlayer } from "../../Config/redux/slices/betsSlice";
import { useAccount, useBalance } from "wagmi";

const CustomConnectButton = () => {
  const dispatch = useDispatch();
  const { address, isConnected } = useAccount();
  const { data: balanceData } = useBalance({ address });

  useEffect(() => {
    if (isConnected && address && balanceData) {
      const walletInfo = {
        address,
        balance: parseFloat(balanceData.formatted),
        currency: balanceData.symbol,
      };

      console.log("Dispatching saveWalletData with:", walletInfo);
      dispatch(saveWalletData(walletInfo));

      // Generate a default username (you can improve this)
      const username = `User_${address.slice(-4)}`;

      console.log("Dispatching createPlayer with:", { walletAddress: address, username });
      dispatch(createPlayer({ walletAddress: address, username }));
    }
  }, [isConnected, address, balanceData, dispatch]);

  return <ConnectButton />;
};

export default CustomConnectButton;
