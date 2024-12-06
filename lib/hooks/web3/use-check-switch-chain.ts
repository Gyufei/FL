import { useChainId, useSwitchChain } from "wagmi";
import { ChainConfigs } from "@/lib/const/chain-configs";
import { ChainType } from "@/lib/types/chain";
import { useMemo } from "react";

export function useCheckSwitchChain(chain: ChainType) {
  const chainId = useChainId();
  const { switchChainAsync } = useSwitchChain();

  const isEvm = [ChainType.ETH, ChainType.BNB].includes(chain as ChainType);

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

  function checkAndSwitchChain() {
    if (chain !== currentWalletChain) {
      const shouldChainId = Number(ChainConfigs[chain].network);
      switchChainAsync({ chainId: shouldChainId });
    }
  }
  return { checkAndSwitchChain };
}
