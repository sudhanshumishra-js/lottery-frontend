"use-client";

import {
  enterRaffle,
  getLotteryDetails,
  initContract,
} from "@/web3/web3helpers";
import { ethers } from "ethers";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import React, { Suspense, forwardRef, useEffect } from "react";
import { types } from "util";
import { useAccount, useWalletClient } from "wagmi";
import Loading from "./Loading";
import toaster from "toastify-react";

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
  const [txSuccess, setTxSuccess] = React.useState<boolean>(false);
  const [isTxProcessing, setIsTxProcessing] = React.useState<boolean>(false);

  useEffect(() => {
    const contract = initContract();
    setContract(contract);
    setIsLoading(true);
    getLotteryDetails()
      .then((res) => {
        // setParticipationFee(Number(res.participationFee));
        setRecentWinner(res.recentWinner);
        setTimeLeft(res.lastTimeStamp);
        setTotalParticipants(res.numberOfParticipants);
        setIsLotteryActive(res.lotteryState);
        // setInterval(res.interval);
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
  React.useEffect(() => {
    if (txSuccess) {
      setIsLoading(true);

      getLotteryDetails()
        .then((res) => {
          // setParticipationFee(Number(res.participationFee));
          setRecentWinner(res.recentWinner);
          setTimeLeft(res.lastTimeStamp);
          setTotalParticipants(res.numberOfParticipants);
          setIsLotteryActive(res.lotteryState);
          // setInterval(res.interval);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsError(true);
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [txSuccess]);

  const handleEnterRaffle = async () => {
    setIsTxProcessing(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    try {
      const tx = await enterRaffle(address, signer);
      const receipt = await tx.wait();
      console.log(receipt);
      setTxSuccess(true);
      // toast("Transaction Successful", { autoClose: 5000 });
      toaster.success("Transaction Successful", { hideAfter: 4 });
      setIsTxProcessing(false);
    } catch (error) {
      console.log(error);
      setTxSuccess(false);
      toaster.error("Some error occured", { hideAfter: 4 });
      setIsTxProcessing(false);
    }
  };

  if (isLoading) return <Loading />;
  return (
    <>
      <Suspense fallback={<Loading />}>
        {/* <ToastContainer autoClose={5000} /> */}
        <div className="w-2/3 sm:w-2/3 md:w-2/3  lg:w-4/5 xl:w-3/4 mx-auto overflow-hidden break-words px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6 xl:px-10 xl:py-10 backdrop-blur-sm bg-white/50 rounded-xl mb-20">
          <div className="flex justify-center items-center gap-10">
            {/* <button
              type="button"
              className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 border-2 border-black"
              onClick={handleEnterRaffle}
            >
              {isTxProcessing ? (
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="black"
                    strokeWidth="2"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="black"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Enter Lottery"
              )}
            </button> */}
            <button
              type="button"
              className="relative text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 border-2 border-black"
              onClick={handleEnterRaffle}
            >
              {isTxProcessing ? (
                <div className="flex items-center justify-center space-x-2 w-full">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="black"
                      strokeWidth="2"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="black"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Processing</span>
                </div>
              ) : (
                "Enter Lottery"
              )}
            </button>
          </div>

          <div className="mt-10 mb-10">
            <div className="text-center flex justify-center items-center md:flex md:justify-between md:items-center gap-5 md:w-3/4 md:mx-auto ">
              <span className="font-extrabold">Entrance Fees</span>
              <span className="font-thin">0.01 Eth</span>
            </div>
            <div className="text-center flex justify-center items-center md:flex md:justify-between md:items-center gap-5 md:w-3/4 md:mx-auto ">
              <span className="font-extrabold">Recent Winner</span>
              <span className="font-thin">{recentWinner}</span>
            </div>
            <div className="text-center flex justify-center items-center md:flex md:justify-between md:items-center gap-5 md:w-3/4 md:mx-auto ">
              <span className="font-extrabold">Number of participants</span>
              <span className="font-thin">{totalParticipants}</span>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default Lottery;
