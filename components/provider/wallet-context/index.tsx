"use client";

import React, { ReactNode } from "react";
import { State } from "wagmi";
import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider } from "@privy-io/wagmi";
// @ts-expect-error ignore this error of declare
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana";
import { useAtomValue } from "jotai";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { getEvmWagmiConfig, supportedChains } from "./wagmi-config";

import { CustomRpcsAtom, GlobalRpcsAtom } from "@/lib/states/rpc";

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
  const bnbRpc = customRpcs.bnb || globalRpcs.bnb;

  const wagmiConfig = getEvmWagmiConfig({
    ethRpc,
    bnbRpc,
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
