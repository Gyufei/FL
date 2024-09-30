import { truncateAddr } from "@/lib/utils/web3";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useMemo } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useCurrentChain } from "./use-current-chain";

export function useChainWallet() {
  const { isEvm, isSolana } = useCurrentChain();

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
    (evmThing: any, bscThing: any, solThing: any) => {
      if (isEvm) {
        return evmThing;
      }

      if (isSolana) {
        return solThing;
      }
    },
    [isEvm, isSolana],
  );

  const connected = useMemo(() => {
    return getAboutChain(evmConnected, evmConnected, solConnected);
  }, [getAboutChain, evmConnected, solConnected]);

  const connecting = useMemo(() => {
    return getAboutChain(evmConnecting, evmConnecting, solConnecting);
  }, [getAboutChain, evmConnecting, solConnecting]);

  const address = useMemo(() => {
    return getAboutChain(evmAddress, evmAddress, solAddress?.toBase58());
  }, [getAboutChain, evmAddress, solAddress]);

  const disconnect = useMemo(() => {
    return getAboutChain(evmDisconnect, evmDisconnect, solDisconnect);
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
