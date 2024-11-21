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
// import { isProduction } from "@/lib/PathMap";

// Setup queryClient
const queryClient = new QueryClient();

// const PrivyAppId = isProduction
//   ? "cm1zw8i5x0467pxhlk18wzyat"
//   : "cm2snsdxe0695w0q7mis0tapu";

const PrivyAppId = "cm2snsdxe0695w0q7mis0tapu";

const solanaConnectors = toSolanaWalletConnectors({
  // By default, shouldAutoConnect is enabled
  shouldAutoConnect: false,
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
          showWalletLoginFirst: true,
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
