"use client";
import Header from "@/components/Header";
import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";
import { config } from "dotenv";
config();
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, sepolia, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base, zora } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
const { chains, publicClient } = configureChains(
  [mainnet, sepolia],
  [
    alchemyProvider({ apiKey: process.env.NEXT_ALCHEMY_ID || "" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Lottery",
  projectId: "9db50fcef8f52b719deb3165f6d7beec",
  chains: chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>Smart Contract Lottery</title>

      <body className="bg-gradient-to-r from-rose-100 to-teal-100">
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            {/* <div className="bg-gradient-to-r from-rose-100 to-teal-100 h-screen w-screen"> */}
            <div className="px-10  max-w-screen-2xl mx-auto max-xl:px-15 max-md:px-10 max-sm:px-8 px-05">
              <Header />
              {children}
            </div>
            {/* </div> */}
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
