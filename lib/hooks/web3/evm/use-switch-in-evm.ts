import { useChainId } from "wagmi";
import { useCurrentChain } from "../use-current-chain";
import { useCallback } from "react";
import { ChainConfigs } from "@/lib/const/chain-config";

export function useSwitchInEvm() {
  const chainId = useChainId();
  const { isSolana, isBsc, isEth, switchToEth, switchToBsc } =
    useCurrentChain();

  const checkAndSwitchInEvm = useCallback(async () => {
    if (isSolana) {
      return;
    }

    if (isBsc && chainId !== ChainConfigs.bsc.network) {
      switchToEth();
    } else if (isEth && chainId !== ChainConfigs.eth.network) {
      switchToBsc();
    }
  }, [isSolana, isBsc, isEth, switchToEth, switchToBsc, chainId]);

  return {
    checkAndSwitchInEvm,
  };
}
