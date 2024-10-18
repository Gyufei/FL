import { useCallback, useMemo } from "react";
import { useAtom, useAtomValue } from "jotai";

import {
  ENetworks,
  isBscAtom,
  IsEthAtom,
  IsSolanaAtom,
  NetworkAtom,
} from "@/lib/states/network";
import { useSwitchChain } from "wagmi";

import { ChainConfigs } from "@/lib/const/chain-config";
import { ChainType } from "@/lib/types/chain";

export function useCurrentChain() {
  const [network, setNetwork] = useAtom(NetworkAtom);
  const isEth = useAtomValue(IsEthAtom);
  const isBnb = useAtomValue(isBscAtom);
  const isSolana = useAtomValue(IsSolanaAtom);
  const isEvm = isEth || isBnb;

  const { switchChainAsync } = useSwitchChain();

  const getChainAlias = useCallback((c: ENetworks) => {
    switch (c) {
      case ENetworks.Solana:
        return ChainType.SOLANA;
      case ENetworks.Eth:
        return ChainType.ETH;
      case ENetworks.Bnb:
        return ChainType.BNB;
      default:
        return "";
    }
  }, []);

  const currentChainInfo = useMemo(() => {
    return ChainConfigs[getChainAlias(network)];
  }, [getChainAlias, network]);

  async function switchToEth() {
    if (isEth) return;

    setNetwork(ENetworks.Eth);
    await switchChainAsync({ chainId: ChainConfigs.eth.network as number });
  }

  async function switchToBsc() {
    if (isBnb) return;

    setNetwork(ENetworks.Bnb);
    await switchChainAsync({ chainId: ChainConfigs.bnb.network as number });
  }

  function switchToSolana() {
    if (isSolana) return;

    setNetwork(ENetworks.Solana);
  }

  return {
    network,
    isEth,
    isSolana,
    isBnb,
    isEvm,
    currentChainInfo,
    switchToEth,
    switchToSolana,
    switchToBsc,
  };
}
