import { useMemo } from "react";
import { useAtom, useAtomValue } from "jotai";

import {
  ENetworks,
  IsEthAtom,
  IsSolanaAtom,
  NetworkAtom,
} from "@/lib/states/network";
import { useSwitchChain } from "wagmi";
import { useWeb3Modal, useWeb3ModalState } from "@web3modal/wagmi/react";

import { useEthConfig } from "./use-eth-config";
import { useQueryParams } from "../common/use-query-params";

const currentChainInfoMap = {
  solana: {
    name: "Solana",
    logo: "/icons/solana.svg",
  },
  eth: {
    name: "Ethereum",
    logo: "/icons/eth.svg",
  },
} as const;

export function useCurrentChain() {
  const [network, setNetwork] = useAtom(NetworkAtom);
  const isEth = useAtomValue(IsEthAtom);
  const isSolana = useAtomValue(IsSolanaAtom);

  const { open: wcModalOpen, close: wcModalClose } = useWeb3Modal();
  const { open: isWcModalOpen } = useWeb3ModalState();
  const { switchChain } = useSwitchChain();

  const { ethConfig } = useEthConfig();

  const { goWithQueryParams } = useQueryParams();

  const currentChainInfo = useMemo(() => {
    if (isEth) {
      return currentChainInfoMap.eth;
    } else if (isSolana) {
      return currentChainInfoMap.solana;
    }

    return {
      name: "",
      logo: "/icons/empty.svg",
    };
  }, [isEth, isSolana]);

  function switchToEth() {
    if (isEth) return;

    setNetwork(ENetworks.Eth);
    switchChain({ chainId: ethConfig.id });
    goWithQueryParams("chain", "eth");
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
    currentChainInfo,
    switchToEth,
    switchToSolana,
    isWcModalOpen,
    wcModalOpen,
    wcModalClose,
  };
}
