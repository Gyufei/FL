import { useChainId, useSwitchChain } from "wagmi";
import { ChainConfigs } from "@/lib/const/chain-configs";
import { ChainType } from "@/lib/types/chain";
import { useCallback, useMemo } from "react";

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


    return null;
  }, [chainId, isEvm]);

  const checkAndSwitchChain = useCallback(() => {
    if (!chain || !isEvm) {
      return true;
    }

    if (chain !== currentWalletChain) {
      const shouldChainId = Number(ChainConfigs[chain].network);
      return switchChainAsync({ chainId: shouldChainId });
    }

    return true;
  }, [chain, isEvm, currentWalletChain, switchChainAsync]);

  return { currentWalletChain, checkAndSwitchChain };
}
