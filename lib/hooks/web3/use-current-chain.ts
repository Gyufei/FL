import { useMemo } from "react";
import { useAtomValue } from "jotai";

import { IsEthAtom, IsSolanaAtom, NetworkAtom } from "@/lib/states/network";

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
  const network = useAtomValue(NetworkAtom);
  const isEth = useAtomValue(IsEthAtom);
  const isSolana = useAtomValue(IsSolanaAtom);

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

  return {
    network,
    isEth,
    isSolana,
    currentChainInfo,
  };
}
