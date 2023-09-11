"use client";
import Lottery from "@/components/Lottery/Lottery";
import Image from "next/image";
import scrollIcon from "../public/scrollIcon.png";
import React from "react";
import ClientOnly from "@/components/ClientOnly/ClientOnly";
import toaster from "toastify-react";

export default function Home() {
  const lotteryDivRef = React.useRef<HTMLDivElement | null>(null);
  const handlePlayNowButton = () => {
    if (lotteryDivRef.current) {
      lotteryDivRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <main>
      <div className="min-h-screen">
        <h1 className="text-center text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl my-10 font-mono bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
          Smart Contract Lottery
        </h1>
        <article className="text-center break-words  sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-xl font-extralight ">
          Join our blockchain-powered lottery where you can see real-time
          participant count and a live countdown to the draw. Choose to play on
          either the Sepolia Testnet or the Mainnet. Dive in, and may luck be on
          your side!
        </article>

        <article className="font-bolder text-black mt-10 text-center mx-auto">
          [ The contract is deployed on Sepolia Testnet. Use{" "}
          <a
            href="https://sepoliafaucet.com/"
            rel="noopener noreferrer"
            target="_blank"
            className="underline underline-offset-4 font-extrabold"
          >
            this
          </a>{" "}
          faucet to fund your account to participate. ]
        </article>

        <button
          className=" font-extrabold mx-auto flex border-2 border-red-500 bg-black text-white  px-5 py-2 rounded-2xl hover:font-black hover:bg-orange-500 hover:border-black shadow-2xl shadow-red-800 transition ease-in-out delay-50 my-20"
          onClick={handlePlayNowButton}
        >
          Play Now
        </button>
        <Image
          src={scrollIcon}
          alt="scroll_icon"
          className="text-center mx-auto animate-bounce"
        ></Image>
      </div>
      <div ref={lotteryDivRef}>
        <ClientOnly>
          <Lottery />
        </ClientOnly>
      </div>
    </main>
  );
}
