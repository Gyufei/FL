"use client";

import React, { ReactNode, useCallback } from "react";

import { WalletError, Adapter } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { SolflareWalletAdapter } from "@solflare-wallet/wallet-adapter";
import { OKXWalletAdapter } from "./okx-wallet-adapter";
import { useRpc } from "@/lib/hooks/web3/use-rpc";
import { useCurrentChain } from "@/lib/hooks/web3/use-current-chain";

export default function SolanaWalletProviders({
  children,
}: {
  children?: ReactNode;
}) {
  const { isSolana } = useCurrentChain();
  const { rpc, currentSolanaRpc } = useRpc();

  const wallets = [
    ...(typeof window === "undefined" ? [] : [new SolflareWalletAdapter()]),
    new OKXWalletAdapter(),
  ];

  const onError = useCallback((err: WalletError, adapter?: Adapter) => {
    console.error(err);
    console.log(adapter?.name, "error");
  }, []);

  return (
    <ConnectionProvider
      endpoint={isSolana ? rpc! : currentSolanaRpc}
      config={{ disableRetryOnRateLimit: true }}
    >
      <WalletProvider wallets={wallets} onError={onError} autoConnect={true}>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
}
