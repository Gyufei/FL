import { useCallback, useEffect, useState } from "react";
import {
  useConnectWallet,
  useLogin,
  useModalStatus,
  usePrivy,
  useSolanaWallets,
} from "@privy-io/react-auth";
import { useWallet } from "@solana/wallet-adapter-react";
import { ENetworks, NetworkAtom } from "@/lib/states/network";
import { useAtom } from "jotai";

export function usePrivyWallet() {
  const [network, setNetwork] = useAtom(NetworkAtom);
  const { ready, authenticated } = usePrivy();
  const { wallets: allSolanaWallets, select } = useWallet();

  const { login } = useLogin();
  const { connectWallet } = useConnectWallet({
    onSuccess: (linkW) => {
      syncChain(linkW);
      syncSolWallet(linkW);
    },
  });
  const { isOpen } = useModalStatus();

  const { wallets: solanaWallets } = useSolanaWallets();

  const syncChain = useCallback(
    (linkW: any) => {
      const currentChain = network === ENetworks.Solana ? "solana" : "ethereum";
      if (linkW.type !== currentChain) {
        setNetwork(linkW.type === "solana" ? ENetworks.Solana : ENetworks.Eth);
      }
    },
    [network, setNetwork],
  );

  const toConnectWallet = useCallback(() => {
    if (!ready || isOpen) return;

    if (!authenticated) {
      login();
    } else {
      connectWallet();
    }
  }, [ready, isOpen, authenticated, login, connectWallet]);

  const syncSolWallet = useCallback(
    (linkW: any) => {
      for (const w of allSolanaWallets) {
        if (w.adapter.name === linkW.meta.name) {
          select(w.adapter.name);
          break;
        }
      }
    },
    [allSolanaWallets, select],
  );

  const connectToLinkedSolWallet = useCallback(() => {
    if (network !== ENetworks.Solana) return;
    if (!solanaWallets?.length) return;

    for (const linkW of solanaWallets) {
      if (linkW.linked) {
        syncSolWallet(linkW);
      }
    }
  }, [network, solanaWallets, syncSolWallet]);

  const [hasShow, setHasShow] = useState(false);

  useEffect(() => {
    if (!ready || hasShow) return;

    if (!authenticated) {
      setHasShow(true);
      toConnectWallet();
    } else {
      connectToLinkedSolWallet();
    }
  }, [ready, authenticated, toConnectWallet, connectToLinkedSolWallet]);

  useEffect(() => {
    if (ready && !authenticated) {
      toConnectWallet();
    }
  }, []);

  return {
    toConnectWallet,
  };
}
