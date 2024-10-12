import { useMemo } from "react";
import { useAtom, useAtomValue } from "jotai";

import {
  ENetworks,
  isBscAtom,
  IsEthAtom,
  IsSolanaAtom,
  NetworkAtom,
} from "@/lib/states/network";
import { useSwitchChain } from "wagmi";

import { ChainConfigs, IChainConfig } from "@/lib/const/chain-config";

export function useCurrentChain() {
  const [network, setNetwork] = useAtom(NetworkAtom);
  const isEth = useAtomValue(IsEthAtom);
  const isBnb = useAtomValue(isBscAtom);
  const isSolana = useAtomValue(IsSolanaAtom);
  const isEvm = isEth || isBnb;

  const { switchChainAsync } = useSwitchChain();

  const currentChainInfo = useMemo(() => {
    if (isEth) {
      return ChainConfigs.eth;
    } else if (isBnb) {
      return ChainConfigs.bnb;
    } else if (isSolana) {
      return ChainConfigs.solana;
    }

    return {
      name: "",
      alias: "",
      logo: "/icons/empty.svg",
    } as IChainConfig;
  }, [isEth, isSolana, isBnb]);

  async function switchToEth() {
    if (isEth) return;

    setNetwork(ENetworks.Eth);
    await switchChainAsync({ chainId: ChainConfigs.eth.network as number });
  }

  async function switchToBsc() {
    if (isBnb) return;

    setNetwork(ENetworks.Bsc);
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
