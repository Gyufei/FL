import { ChainConfigs } from "@/lib/const/chain-config";
import { useMemo } from "react";
import { useCurrentChain } from "./use-current-chain";

export function useEvmConfig() {
  const { isEth, isBsc } = useCurrentChain();

  const evmConfig = useMemo(() => {
    if (isEth) {
      return ChainConfigs.eth;
    }

    if (isBsc) {
      return ChainConfigs.bsc;
    }

    return ChainConfigs.eth;
  }, [isEth, isBsc]);

  return {
    evmConfig,
  };
}
