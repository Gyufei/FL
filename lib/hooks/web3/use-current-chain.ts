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

import { useQueryParams } from "../common/use-query-params";
import { ChainConfigs, IChainConfig } from "@/lib/const/chain-config";
import { useLogin, useModalStatus } from "@privy-io/react-auth";

export function useCurrentChain() {
  const [network, setNetwork] = useAtom(NetworkAtom);
  const isEth = useAtomValue(IsEthAtom);
  const isBsc = useAtomValue(isBscAtom);
  const isSolana = useAtomValue(IsSolanaAtom);
  const isEvm = isEth || isBsc;

  const wcModalClose = () => {};
  const { login: wcModalOpen } = useLogin();
  const { isOpen: isWcModalOpen } = useModalStatus();
  const { switchChainAsync } = useSwitchChain();

  const { goWithQueryParams } = useQueryParams();

  const currentChainInfo = useMemo(() => {
    if (isEth) {
      return ChainConfigs.eth;
    } else if (isBsc) {
      return ChainConfigs.bsc;
    } else if (isSolana) {
      return ChainConfigs.solana;
    }

    return {
      name: "",
      alias: "",
      logo: "/icons/empty.svg",
    } as IChainConfig;
  }, [isEth, isSolana, isBsc]);

  async function switchToEth() {
    if (isEth) return;

    setNetwork(ENetworks.Eth);
    await switchChainAsync({ chainId: ChainConfigs.eth.network as number });
    goWithQueryParams("chain", "eth");
  }

  async function switchToBsc() {
    if (isBsc) return;

    setNetwork(ENetworks.Bsc);
    await switchChainAsync({ chainId: ChainConfigs.bsc.network as number });
    goWithQueryParams("chain", "bsc");
  }

  function switchToSolana() {
    if (isSolana) return;

    setNetwork(ENetworks.Solana);
    goWithQueryParams("chain", "solana");
  }

  return {
    network,
    isEth,
    isSolana,
    isBsc,
    isEvm,
    currentChainInfo,
    switchToEth,
    switchToSolana,
    switchToBsc,
    isWcModalOpen,
    wcModalOpen,
    wcModalClose,
  };
}
