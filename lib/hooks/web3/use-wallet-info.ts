import { ENetworks, NetworkAtom } from "@/lib/states/network";
import toPubString from "@/lib/utils/pub-string";
import { truncateAddr } from "@/lib/utils/web3";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { useAccount } from "wagmi";

export default function useWalletInfo() {
  const network = useAtomValue(NetworkAtom);

  const {
    address: ethAddress,
    isConnected: ethConnected,
    // isDisconnected: isEthDisconnected,
    isConnecting: ethConnecting,
  } = useAccount();

  const {
    publicKey: solAddress,
    connected: solConnected,
    connecting: solConnecting,
  } = useWallet();

  const connected = useMemo(() => {
    if (network === ENetworks.Eth) {
      return ethConnected;
    }

    if (network === ENetworks.Solana) {
      return solConnected;
    }
  }, [network, ethConnected, solConnected]);

  const connecting = useMemo(() => {
    if (network === ENetworks.Eth) {
      return ethConnecting;
    }

    if (network === ENetworks.Solana) {
      return solConnecting;
    }
  }, [network, ethConnecting, solConnecting]);

  const address = useMemo(() => {
    if (network === ENetworks.Eth) {
      return ethAddress;
    }

    if (network === ENetworks.Solana) {
      return toPubString(solAddress);
    }
  }, [network, ethAddress, solAddress]);

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
  };
}
