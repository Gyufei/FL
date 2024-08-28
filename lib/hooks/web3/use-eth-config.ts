import { EthConfig, EthTestConfig } from "@/lib/const/eth";
import { isProduction } from "@/lib/PathMap";
import { useEffect, useMemo } from "react";
import { useSwitchChain } from "wagmi";

export function useEthConfig() {
  const { switchChain } = useSwitchChain();

  useEffect(() => {
    if (!isProduction) {
      switchChain({ chainId: EthTestConfig.id });
    }
  }, [switchChain]);

  const ethConfig = useMemo(() => {
    return isProduction ? EthConfig : EthTestConfig;
  }, []);

  return {
    ethConfig,
  };
}
