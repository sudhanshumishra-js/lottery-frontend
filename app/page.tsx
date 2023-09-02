"use client";
import Lottery from "@/components/Lottery/Lottery";
import Image from "next/image";
import scrollIcon from "../public/scrollIcon.png";
import { useRef } from "react";
export default function Home() {
  const lotteryDivRef = useRef<HTMLDivElement>(null);
  const handlePlayNowClick = () => {
    lotteryDivRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <main>
      <div className="min-h-screen">
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl my-10 font-mono">
          Smart Contract Lottery
        </h1>
        <article className="text-center break-words  sm:text-lg md:text-xl lg:text-2xl xl text-3xl font-extralight ">
          Join our blockchain-powered lottery where you can see real-time
          participant count and a live countdown to the draw. Choose to play on
          either the Sepolia Testnet or the Mainnet. Dive in, and may luck be on
          your side!
        </article>
        <button
          className=" font-extrabold mx-auto flex border-2 border-red-500 bg-black text-white  px-5 py-2 rounded-2xl hover:font-black hover:bg-orange-500 hover:border-black shadow-2xl shadow-red-800 transition ease-in-out delay-50 my-20"
          onClick={handlePlayNowClick}
        >
          Play Now
        </button>
        <Image
          src={scrollIcon}
          alt="scroll_icon"
          className="text-center mx-auto "
        ></Image>
      </div>
      <Lottery ref={lotteryDivRef} />
    </main>
  );
}
