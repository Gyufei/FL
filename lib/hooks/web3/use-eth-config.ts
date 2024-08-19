import { EthConfig } from "@/lib/const/eth";
import { useMemo } from "react";

export function useEthConfig() {
  const ethConfig = useMemo(() => {
    return EthConfig;
  }, []);

  return {
    ethConfig,
  };
}
