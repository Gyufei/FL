import { useMemo } from "react";
import { ChainConfigs } from "@/lib/const/chain-config";

export function useSolanaConfig() {
  const solanaConfig = useMemo(() => {
    return ChainConfigs.solana;
  }, []);

  return {
    solanaConfig,
  };
}
