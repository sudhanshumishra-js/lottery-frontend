import { ethers } from "ethers";
import contractAddress from "../constants/contractAddresses.json";
import abi from "../constants/abi.json";
const providerUrl = `${process.env.NEXT_RPC_PROVIDER_URL}`;

export const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-sepolia.g.alchemy.com/v2/XoX-cx0mV9TCMXGfLFl2bg0VwK8orBAu"
);

export const initContract = () => {
  const contract = new ethers.Contract(
    contractAddress[11155111][0],
    abi,
    provider
  );
  return contract;
};

export const getLotteryDetails = async () => {
  const contract = initContract();

  const lotteryState = (await contract.functions.getRaffleState()).toString();
  const numberOfParticipants = (
    await contract.functions.getNumberOfPlayers()
  ).toString();
  const recentWinner = (await contract.functions.getRecentWinner()).toString();
  const lastTimeStamp = (
    await contract.functions.getLastTimeStamp()
  ).toString();
  const participationFee = (
    await contract.functions.getEntranceFee()
  ).toString();
  const interval = (await contract.functions.getInterval()).toString();

  return {
    lotteryState,
    numberOfParticipants,
    recentWinner,
    lastTimeStamp,
    participationFee,
    interval,
  };
};
