import { truncateAddr } from "@/lib/utils/web3";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useMemo } from "react";
import { useAccount, useChainId, useDisconnect } from "wagmi";
import { usePrivy } from "@privy-io/react-auth";
import { ChainConfigs } from "@/lib/const/chain-configs";
import { ChainType } from "@/lib/types/chain";

export function useChainWallet() {
  const { ready, authenticated } = usePrivy();

  const {
    address: evmAddress,
    isConnected: evmConnected,
    // isDisconnected: isEthDisconnected,
    isConnecting: evmConnecting,
  } = useAccount();

  const chainId = useChainId();

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

      return evmThing || solThing;
    },
    [ready, authenticated],
  );

  const currentChain = useMemo(() => {
    if (ChainConfigs[ChainType.ETH].network === chainId) {
      return ChainType.ETH;
    }

    if (ChainConfigs[ChainType.BNB].network === chainId) {
      return ChainType.BNB;
    }

    if (solAddress) {
      return ChainType.SOLANA;
    }

    return ChainType.ETH;
  }, [chainId, solAddress]);

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
    currentChain,
  };
}
