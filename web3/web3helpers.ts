import { Signer, ethers } from "ethers";
import contractAddress from "../constants/contractAddresses.json";
import abi from "../constants/abi.json";
import { Address } from "wagmi";
const providerUrl = `${process.env.NEXT_RPC_PROVIDER_URL}`;

export const provider = new ethers.providers.JsonRpcProvider(
  "https://sepolia.infura.io/v3/f7215b61093a4ad385733d981d6b7614"
);

export const initContract = (signer?: Signer | null) => {
  const contract = new ethers.Contract(
    contractAddress[11155111][0],
    abi,
    signer ? signer : provider
  );
  return contract;
};

export const getLotteryDetails = async () => {
  const contract = initContract();

  const lotteryState = (await contract.getRaffleState()).toString();
  const numberOfParticipants = (
    await contract.functions.getNumberOfPlayers()
  ).toString();
  const recentWinner = (await contract.getRecentWinner()).toString();
  const lastTimeStamp = (
    await contract.functions.getLastTimeStamp()
  ).toString();
  // let participationFee = (await contract.getEntranceFee()).toString();
  // participationFee = ethers.utils.parseEther(participationFee);
  // const interval = (await contract.functions.getInterval()).toString();
  // const lotteryState = false;
  // const numberOfParticipants = "3";
  // const recentWinner = "0x95E6951539719A87D31ded8425E471521a6815b1";

  // const lastTimeStamp = "1694102980955";
  // const participationFee = "0.01";
  // const interval = "30";

  return {
    lotteryState,
    numberOfParticipants,
    recentWinner,
    lastTimeStamp,
  };
};

export const enterRaffle = async (address: any, signer: Signer) => {
  const contract = initContract(signer);
  const entranceFees = ethers.utils.parseEther("0.1");
  const result = await contract.enterRaffle({ value: entranceFees });
  return result;
};
