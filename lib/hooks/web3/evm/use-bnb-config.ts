import { ChainConfigs } from "@/lib/const/chain-config";
import { useMemo } from "react";

export function useBnbConfig() {
  const bnbConfig = useMemo(() => {
    return ChainConfigs.bnb;
  }, []);

  return {
    bnbConfig,
  };
}
