"use-client";

// type lotteryProps = {
//   name: string;
//   data: string;
// };

import React, { forwardRef } from "react";
import { types } from "util";
import { useAccount } from "wagmi";

const Lottery = () => {
  const { address, isConnected } = useAccount();
  return (
    <>
      <div>
        {!isConnected ? <span>Please Connect wallet to continue.</span> : null}
      </div>
    </>
  );
};

export default Lottery;
