import React, { useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useDispatch } from "react-redux";
import { saveWalletData } from "../../Config/redux/slices/betsSlice";
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
    }
  }, [isConnected, address, balanceData, dispatch]);

  return <ConnectButton />;
};

export default CustomConnectButton;
