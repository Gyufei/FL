"use client";

import React, { ReactNode } from "react";
import { getEvmWagmiConfig, supportedChains } from "./wagmi-config";
import { State } from "wagmi";
import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider } from "@privy-io/wagmi";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CustomRpcsAtom, GlobalRpcsAtom } from "@/lib/states/rpc";
import { useAtomValue } from "jotai";
// eslint-disable-next-line
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana";

// Setup queryClient
const queryClient = new QueryClient();

const PrivyAppId = "cm1zw8i5x0467pxhlk18wzyat";

const solanaConnectors = toSolanaWalletConnectors({
  // By default, shouldAutoConnect is enabled
  shouldAutoConnect: true,
});

export default function Web3ModalProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  const globalRpcs = useAtomValue(GlobalRpcsAtom);
  const customRpcs = useAtomValue(CustomRpcsAtom);

  const ethRpc = customRpcs.eth || globalRpcs.eth;
  const bscRpc = customRpcs.bsc || globalRpcs.bsc;

  const wagmiConfig = getEvmWagmiConfig({
    ethRpc,
    bscRpc,
  });

  return (
    <PrivyProvider
      appId={PrivyAppId}
      config={{
        appearance: {
          showWalletLoginFirst: false,
          logo: "/icons/logo.svg",
          walletChainType: "ethereum-and-solana",
        },
        loginMethods: [
          "email",
          "wallet",
          "google",
          "apple",
          "github",
          "discord",
        ],
        supportedChains: supportedChains as any,
        externalWallets: {
          solana: {
            connectors: solanaConnectors,
          },
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig} initialState={initialState}>
          {children}
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
