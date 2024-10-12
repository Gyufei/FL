import { truncateAddr } from "@/lib/utils/web3";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useMemo } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useCurrentChain } from "./use-current-chain";
import { usePrivy } from "@privy-io/react-auth";

export function useChainWallet() {
  const { isEvm, isSolana } = useCurrentChain();
  const { ready, authenticated } = usePrivy();

  const {
    address: evmAddress,
    isConnected: evmConnected,
    // isDisconnected: isEthDisconnected,
    isConnecting: evmConnecting,
  } = useAccount();

  const { disconnect: evmDisconnect } = useDisconnect();

  const {
    publicKey: solAddress,
    connected: solConnected,
    connecting: solConnecting,
    disconnect: solDisconnect,
  } = useWallet();

  const getAboutChain = useCallback(
    (evmThing: any, bnbThing: any, solThing: any, defaultThing?: any) => {
      if (!ready || !authenticated) {
        return defaultThing;
      }

      if (isEvm) {
        return evmThing;
      }

      if (isSolana) {
        return solThing;
      }
    },
    [isEvm, isSolana, ready, authenticated],
  );

  const connected = useMemo(() => {
    return getAboutChain(evmConnected, evmConnected, solConnected, false);
  }, [getAboutChain, evmConnected, solConnected]);

  const connecting = useMemo(() => {
    return getAboutChain(evmConnecting, evmConnecting, solConnecting, false);
  }, [getAboutChain, evmConnecting, solConnecting]);

  const address = useMemo(() => {
    return getAboutChain(evmAddress, evmAddress, solAddress?.toBase58(), null);
  }, [getAboutChain, evmAddress, solAddress]);

  const disconnect = useMemo(() => {
    return getAboutChain(evmDisconnect, evmDisconnect, solDisconnect, null);
  }, [getAboutChain, evmDisconnect, solDisconnect]);

  const shortAddr = useMemo(() => {
    if (!address) return "";
    return truncateAddr(address, {
      nPrefix: 4,
      nSuffix: 4,
    });
  }, [address]);

  return {
    address,
    shortAddr,
    connected,
    connecting,
    disconnect,
  };
}
