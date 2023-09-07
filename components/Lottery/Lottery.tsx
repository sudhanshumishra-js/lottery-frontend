"use-client";

import { getLotteryDetails, initContract } from "@/web3/web3helpers";
import { ethers } from "ethers";
// type lotteryProps = {
//   name: string;
//   data: string;
// };

import React, { Suspense, forwardRef, useEffect } from "react";
import { types } from "util";
import { useAccount } from "wagmi";
import Loading from "./Loading";

const Lottery = () => {
  const { address, isConnected } = useAccount();
  const [contract, setContract] = React.useState<Object | null>();
  const [recentWinner, setRecentWinner] = React.useState<string | null>();
  const [timeLeft, setTimeLeft] = React.useState<string | null>();
  const [totalParticipants, setTotalParticipants] = React.useState<
    string | null
  >();
  const [participationFee, setParticipationFee] = React.useState<number>(0.1);
  const [isLotteryActive, setIsLotteryActive] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [interval, setInterval] = React.useState<string | null>();

  useEffect(() => {
    const contract = initContract();
    setContract(contract);
    setIsLoading(true);
    getLotteryDetails()
      .then((res) => {
        setParticipationFee(Number(res.participationFee));
        setRecentWinner(res.recentWinner);
        setTimeLeft(res.lastTimeStamp);
        setTotalParticipants(res.numberOfParticipants);
        setIsLotteryActive(res.lotteryState);
        setInterval(res.interval);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  if (isLoading) return <Loading />;
  return (
    <>
      <div className="flex justify-center bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg w-100 h-100">
        <div>Participation fees : </div>
        <div>
          Contract details =&gt; {recentWinner}&nbsp; {participationFee / 1e18}{" "}
          {timeLeft} {totalParticipants} {isLotteryActive} {interval}
        </div>
      </div>
    </>
  );
};

export default Lottery;
