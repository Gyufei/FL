import { EthConfig, EthTestConfig } from "@/lib/const/eth";
import { isProduction } from "@/lib/PathMap";
import { useMemo } from "react";

export function useEthConfig() {
  const ethConfig = useMemo(() => {
    return isProduction ? EthConfig : EthTestConfig;
  }, []);

  return {
    ethConfig,
  };
}
