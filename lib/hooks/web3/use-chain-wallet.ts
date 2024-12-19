import { truncateAddr } from "@/lib/utils/web3";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMemo } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { ChainType } from "@/lib/types/chain";

const EmptyWallet = {
  address: "",
  shortAddr: "",
  connected: false,
  connecting: false,
  disconnect: () => {},
  connector: {},
};

export function useChainWallet(chain?: ChainType) {
  const {
    address: evmAddress,
    isConnected: evmConnected,
    // isDisconnected: isEthDisconnected,
    isConnecting: evmConnecting,
    connector: evmConnector,
  } = useAccount();

  const { disconnect: evmDisconnect } = useDisconnect();

  const isEvm = [ChainType.ETH, ChainType.BNB].includes(chain as ChainType);

  const {
    publicKey: solAddress,
    connected: solConnected,
    connecting: solConnecting,
    disconnect: solDisconnect,
  } = useWallet();

  const evmWallet = useMemo(
    () => ({
      address: evmAddress || "",
      shortAddr: evmAddress
        ? truncateAddr(evmAddress, { nPrefix: 4, nSuffix: 4 })
        : "",
      connected: evmConnected,
      connecting: evmConnecting,
      disconnect: evmDisconnect,
      connector: evmConnector,
    }),
    [evmAddress, evmConnected, evmConnecting, evmDisconnect, evmConnector],
  );

  const solanaWallet = useMemo(
    () => ({
      address: solAddress ? solAddress.toBase58() : "",
      shortAddr: solAddress
        ? truncateAddr(solAddress.toBase58(), { nPrefix: 4, nSuffix: 4 })
        : "",
      connected: solConnected,
      connecting: solConnecting,
      disconnect: solDisconnect,
      connector: {},
    }),
    [solAddress, solConnected, solConnecting, solDisconnect],
  );

  if (!chain) {
    return evmWallet.address ? evmWallet : solanaWallet;
  }

  if (isEvm) {
    return evmWallet;
  } else if (chain === ChainType.SOLANA) {
    return solanaWallet;
  } else {
    return EmptyWallet;
  }
}
