"use client";
import React, { useEffect, useState } from "react";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import { useAccount, useNetwork } from "wagmi";
import { switchNetwork } from "wagmi/actions";

const Header = () => {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const { address, isConnecting, isDisconnected } = useAccount();
  const { chain, chains } = useNetwork();
  const [isClient, setIsClient] = useState(false);
  const handleSwitchNetwork = () => {
    switchNetwork({ chainId: 11155111 });
  };
  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    if (address && chain?.id === 11155111) {
      setButtonText("Connected");
    } else if (!address) {
      setButtonText("Connect Wallet");
    }
  }, [address, chain?.id]);
  const [buttonText, setButtonText] = useState("Connected");
  return (
    <div className="flex flex-row justify-end px-10 pt-3 pb-3 max-sm:px-0 ">
      {isClient &&
        (!address ? (
          <button
            onClick={openConnectModal}
            className="px-4 py-2 rounded-lg border-purple-700 font-bold border-2 shadow-xl bg-red-200  hover:bg-cyan-300 hover:border-black transition ease-in-out delay-150"
          >
            Connect Wallet
          </button>
        ) : address && chain?.id === 11155111 ? (
          <button
            onClick={openAccountModal}
            className=" font-bold px-4 py-2 rounded-lg bg-black text-white border-2  border-orange-500 hover:bg-orange-500 hover:text-white  hover:border-black transition ease-in-out delay-150 shadow-xl"
            border-2
            onMouseEnter={() => setButtonText("Disconnect")}
            onMouseLeave={() => setButtonText("Connected")}
          >
            {buttonText}
          </button>
        ) : (
          <button
            onClick={handleSwitchNetwork}
            className=" font-bold px-4 py-2 rounded-lg border-teal-400 border-2 shadow-xl hover:bg-cyan-300 hover:border-black transition ease-in-out delay-150"
          >
            Switch Network
          </button>
        ))}
    </div>
  );
};

export default Header;
