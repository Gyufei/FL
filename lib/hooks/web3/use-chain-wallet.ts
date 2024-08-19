import { truncateAddr } from "@/lib/utils/web3";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useMemo } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useCurrentChain } from "./use-current-chain";

export function useChainWallet() {
  const { isEth, isSolana } = useCurrentChain();

  const {
    address: ethAddress,
    isConnected: ethConnected,
    // isDisconnected: isEthDisconnected,
    isConnecting: ethConnecting,
  } = useAccount();

  const { disconnect: ethDisconnect } = useDisconnect();

  const {
    publicKey: solAddress,
    connected: solConnected,
    connecting: solConnecting,
    disconnect: solDisconnect,
  } = useWallet();

  const getAboutChain = useCallback(
    (ethThing: any, solThing: any) => {
      if (isEth) {
        return ethThing;
      }

      if (isSolana) {
        return solThing;
      }
    },
    [isEth, isSolana],
  );

  const connected = useMemo(() => {
    return getAboutChain(ethConnected, solConnected);
  }, [getAboutChain, ethConnected, solConnected]);

  const connecting = useMemo(() => {
    return getAboutChain(ethConnecting, solConnecting);
  }, [getAboutChain, ethConnecting, solConnecting]);

  const address = useMemo(() => {
    return getAboutChain(ethAddress, solAddress?.toBase58());
  }, [getAboutChain, ethAddress, solAddress]);

  const disconnect = useMemo(() => {
    return getAboutChain(ethDisconnect, solDisconnect);
  }, [getAboutChain, ethDisconnect, solDisconnect]);

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
