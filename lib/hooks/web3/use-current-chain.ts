import { useEffect, useMemo } from "react";
import { useAtom, useAtomValue } from "jotai";

import {
  ENetworks,
  IsEthAtom,
  IsSolanaAtom,
  NetworkAtom,
} from "@/lib/states/network";
import { useAccount, useSwitchChain } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

import { useEthConfig } from "./use-eth-config";
import { useQueryParams } from "../common/use-query-params";
import { usePathname } from "@/app/navigation";

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

const AllowChainParamsPage = ["/marketplace"];

export function useCurrentChain() {
  const [network, setNetwork] = useAtom(NetworkAtom);
  const isEth = useAtomValue(IsEthAtom);
  const isSolana = useAtomValue(IsSolanaAtom);

  const { open: wcModalOpen, close: wcModalClose } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { switchChain } = useSwitchChain();

  const { ethConfig } = useEthConfig();

  const pathname = usePathname();
  const { searchParams, goWithQueryParams } = useQueryParams();
  const isAllowChainParams = AllowChainParamsPage.includes(pathname);

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
    if (!isConnected) {
      wcModalOpen();
    }
  }

  function switchToSolana() {
    if (isSolana) return;

    setNetwork(ENetworks.Solana);
    goWithQueryParams("chain", "solana");
  }

  useEffect(() => {
    if (!isAllowChainParams) return;

    const chain = searchParams.get("chain");

    if (!chain) {
      goWithQueryParams("chain", isEth ? "eth" : "solana");
    }
  }, [isAllowChainParams, isEth, isSolana, searchParams, setNetwork]);

  useEffect(() => {
    if (!isAllowChainParams) return;

    const chain = searchParams.get("chain");

    if (chain === "eth" && !isEth) {
      setNetwork(ENetworks.Eth);
    } else if (chain === "solana" && !isSolana) {
      setNetwork(ENetworks.Solana);
    }
  }, []);

  return {
    network,
    isEth,
    isSolana,
    currentChainInfo,
    switchToEth,
    switchToSolana,
    wcModalOpen,
    wcModalClose,
  };
}
