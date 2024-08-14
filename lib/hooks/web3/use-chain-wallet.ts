import { ENetworks, NetworkAtom } from "@/lib/states/network";
import { truncateAddr } from "@/lib/utils/web3";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAtomValue } from "jotai";
import { useCallback, useMemo } from "react";
import { useAccount, useDisconnect } from "wagmi";

export function useChainWallet() {
  const network = useAtomValue(NetworkAtom);

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
      if (network === ENetworks.Eth) {
        return ethThing;
      }

      if (network === ENetworks.Solana) {
        return solThing;
      }
    },
    [network],
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
