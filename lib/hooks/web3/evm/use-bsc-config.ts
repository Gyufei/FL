import { ChainConfigs } from "@/lib/const/chain-config";
import { useMemo } from "react";

export function useBscConfig() {
  const bscConfig = useMemo(() => {
    return ChainConfigs.bsc;
  }, []);

  return {
    bscConfig,
  };
}
