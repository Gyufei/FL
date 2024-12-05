import { truncateAddr } from "@/lib/utils/web3";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useMemo } from "react";
import { useAccount, useChainId, useDisconnect, useSwitchChain } from "wagmi";
import { ChainConfigs } from "@/lib/const/chain-configs";
import { ChainType } from "@/lib/types/chain";

const EmptyWallet = {
  address: "",
  shortAddr: "",
  connected: false,
  connecting: false,
  disconnect: () => {},
  currentChain: ChainType.ETH,
  switchToTargetChain: () => {},
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

  const chainId = useChainId();
  const { switchChainAsync } = useSwitchChain();
  const { disconnect: evmDisconnect } = useDisconnect();

  const isEvm = [ChainType.ETH, ChainType.BNB].includes(chain as ChainType);

  const {
    publicKey: solAddress,
    connected: solConnected,
    connecting: solConnecting,
    disconnect: solDisconnect,
  } = useWallet();

  const currentWalletChain = useMemo(() => {
    if (isEvm) {
      if (ChainConfigs[ChainType.ETH].network === chainId) {
        return ChainType.ETH;
      }

      if (ChainConfigs[ChainType.BNB].network === chainId) {
        return ChainType.BNB;
      }
    }

    if (chain === ChainType.SOLANA) {
      return chain;
    }

    return null;
  }, [chainId, isEvm, chain]);

  const switchToTargetChain = useCallback(
    async function () {
      console.log("switchToTargetChain", chain, currentWalletChain);
      if (!chain) {
        return true;
      }

      if (chain === ChainType.SOLANA) {
        return true;
      }

      const chainId = Number(ChainConfigs[chain].network);

      if (chain !== currentWalletChain) {
        return switchChainAsync({ chainId });
      }

      return true;
    },
    [chain, currentWalletChain, switchChainAsync],
  );

  const evmWallet = useMemo(
    () => ({
      address: evmAddress || "",
      shortAddr: evmAddress
        ? truncateAddr(evmAddress, { nPrefix: 4, nSuffix: 4 })
        : "",
      connected: evmConnected,
      connecting: evmConnecting,
      disconnect: evmDisconnect,
      currentChain: currentWalletChain,
      switchToTargetChain,
      connector: evmConnector,
    }),
    [
      evmAddress,
      evmConnected,
      evmConnecting,
      evmDisconnect,
      currentWalletChain,
      switchToTargetChain,
      evmConnector,
    ],
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
      currentChain: ChainType.SOLANA,
      switchToTargetChain: () => {},
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
