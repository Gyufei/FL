"use client";

import React, { ReactNode } from "react";
import { State } from "wagmi";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { mainnet, bsc, bscTestnet, sepolia, monadTestnet } from "wagmi/chains";
import { WagmiProvider, cookieStorage, createStorage, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useAtomValue } from "jotai";
import { CustomRpcsAtom, GlobalRpcsAtom } from "@/lib/states/rpc";
import { isProduction } from "@/lib/PathMap";

const queryClient = new QueryClient();

export const supportedChains = isProduction
    ? ([mainnet, bsc, monadTestnet] as const)
    : // : ([mainnet, bsc, sepolia, testnet, bscTestnet] as const);
      ([mainnet, bsc, sepolia, bscTestnet, monadTestnet] as const);

export default function WalletModalProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  const globalRpcs = useAtomValue(GlobalRpcsAtom);
  const customRpcs = useAtomValue(CustomRpcsAtom);

  const monadRpc = customRpcs.monad || globalRpcs.monad;

  const ethRpc = customRpcs.eth || globalRpcs.eth;
  const bnbRpc = customRpcs.bnb || globalRpcs.bnb;
  const transports = isProduction
        ? {
          [monadTestnet.id]: http(monadRpc),
          [mainnet.id]: http(ethRpc),
          [bsc.id]: http(bnbRpc),
        }
      : {
        [monadTestnet.id]: http(monadRpc),
          [mainnet.id]: http(ethRpc),
          [bsc.id]: http(bnbRpc),
          [bscTestnet.id]: http(bnbRpc),
          [sepolia.id]: http(),
          // [testnet.id]: http(),
      };

  const wagmiConfig = getDefaultConfig({
    appName: "Tadle Market",
    projectId: "8e507d09486ed2283f0d0922c0a02261",
    chains: supportedChains,
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
    transports: transports as any,
  });

  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
