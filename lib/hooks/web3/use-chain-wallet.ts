import { truncateAddr } from "@/lib/utils/web3";
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
    isConnecting: evmConnecting,
    connector: evmConnector,
  } = useAccount();

  const { disconnect: evmDisconnect } = useDisconnect();

  const isEvm = [ChainType.ETH, ChainType.BNB].includes(chain as ChainType);

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

  if (!chain) {
    return evmWallet.address ? evmWallet : EmptyWallet;
  }

  if (isEvm) {
    return evmWallet;
  } else {
    return EmptyWallet;
  }
}
