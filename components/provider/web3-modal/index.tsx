"use client";

import React, { ReactNode } from "react";
import { getEvmWagmiConfig } from "./wagmi-config";
import { State } from "wagmi";
import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider } from "@privy-io/wagmi";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CustomRpcsAtom, GlobalRpcsAtom } from "@/lib/states/rpc";
import { useAtomValue } from "jotai";

// Setup queryClient
const queryClient = new QueryClient();

export default function Web3ModalProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  const globalRpcs = useAtomValue(GlobalRpcsAtom);
  const customRpcs = useAtomValue(CustomRpcsAtom);

  const wagmiConfig = getEvmWagmiConfig({
    ethRpc: customRpcs.eth || globalRpcs.eth,
    bscRpc: customRpcs.bsc || globalRpcs.bsc,
  });

  return (
    <PrivyProvider appId="cm1zw8i5x0467pxhlk18wzyat" config={{}}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig} initialState={initialState}>
          {children}
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
