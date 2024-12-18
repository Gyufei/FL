"use client";
import React, { ReactNode } from "react";
import { createConfig, State } from "wagmi";

import { WagmiProvider, cookieStorage, createStorage, http } from "wagmi";
import { mainnet, bsc, bscTestnet, sepolia } from "wagmi/chains";
import { useAtomValue } from "jotai";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CustomRpcsAtom, GlobalRpcsAtom } from "@/lib/states/rpc";
import { isProduction } from "@/lib/PathMap";
import { injected, metaMask, walletConnect } from "wagmi/connectors";

// Setup queryClient
const queryClient = new QueryClient();

export const supportedChains = isProduction
  ? ([mainnet, bsc] as const)
  : // : ([mainnet, bsc, sepolia, testnet, bscTestnet] as const);
    ([mainnet, bsc, sepolia, bscTestnet] as const);

export default function EthWalletsProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  const globalRpcs = useAtomValue(GlobalRpcsAtom);
  const customRpcs = useAtomValue(CustomRpcsAtom);

  const ethRpc = customRpcs.eth || globalRpcs.eth;
  const bnbRpc = customRpcs.bnb || globalRpcs.bnb;

  const transports = isProduction
    ? {
        [mainnet.id]: http(ethRpc),
        [bsc.id]: http(bnbRpc),
      }
    : {
        [mainnet.id]: http(ethRpc),
        [bsc.id]: http(bnbRpc),
        [bscTestnet.id]: http(bnbRpc),
        [sepolia.id]: http(),
        // [testnet.id]: http(),
      };

  const wagmiConfig = createConfig({
    connectors: [
      metaMask(),
      injected(),
      walletConnect({
        projectId: "8e507d09486ed2283f0d0922c0a02261",
      }),
    ],
    chains: supportedChains,
    // ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
    transports: transports as any,
  });

  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
