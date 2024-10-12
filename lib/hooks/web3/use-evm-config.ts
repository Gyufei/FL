import { ChainConfigs } from "@/lib/const/chain-config";
import { useMemo } from "react";
import { useCurrentChain } from "./use-current-chain";

export { useWriteContract } from "wagmi";

export function useEvmConfig() {
  const { isEth, isBnb } = useCurrentChain();

  const evmConfig = useMemo(() => {
    if (isEth) {
      return ChainConfigs.eth;
    }

    if (isBnb) {
      return ChainConfigs.bnb;
    }

    return ChainConfigs.eth;
  }, [isEth, isBnb]);

  return {
    evmConfig,
  };
}
