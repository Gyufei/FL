import { useMemo } from "react";
import { ChainConfigs } from "@/lib/const/chain-configs";

export function useSolanaConfig() {
  const solanaConfig = useMemo(() => {
    return ChainConfigs.solana;
  }, []);

  return {
    solanaConfig,
  };
}
