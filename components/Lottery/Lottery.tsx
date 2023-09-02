import React, { forwardRef } from "react";
import { useAccount } from "wagmi";

const Lottery = forwardRef<HTMLDivElement>((props, ref) => {
  const { address, isConnected } = useAccount();
  return (
    <>
      <div ref={ref}>
        To use the project I have deployed it on Sepolia Testnet.
        {!isConnected ? <span>Please Connect wallet to continue.</span> : null}
      </div>
    </>
  );
});

export default Lottery;
