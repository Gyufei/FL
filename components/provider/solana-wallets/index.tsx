"use client";

import React, { ReactNode, useCallback } from "react";

import { WalletError, Adapter } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { SolflareWalletAdapter } from "@solflare-wallet/wallet-adapter";
import { OKXWalletAdapter } from "./okx-wallet-adapter";
import { useRpc } from "@/lib/hooks/web3/use-rpc";

export function SolanaWalletProviders({ children }: { children?: ReactNode }) {
  const { rpc } = useRpc();

  const wallets = [
    new PhantomWalletAdapter(),
    ...(typeof window === "undefined" ? [] : [new SolflareWalletAdapter()]),
    new OKXWalletAdapter(),
  ];

  const onError = useCallback((err: WalletError, adapter?: Adapter) => {
    console.error(err);
    console.log(adapter?.name, "error");
  }, []);

  return (
    <ConnectionProvider
      endpoint={rpc}
      config={{ disableRetryOnRateLimit: true }}
    >
      <WalletProvider wallets={wallets} onError={onError} autoConnect={true}>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
}
