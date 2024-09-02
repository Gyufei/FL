import { SolanaDevnetConfig, SolanaMainnetConfig } from "@/lib/const/solana";
import { isProduction } from "@/lib/PathMap";
import { useEffect, useMemo } from "react";

export function useSolanaConfig() {
  useEffect(() => {
    localStorage.removeItem("cluster");
    localStorage.removeItem("gRPC");
    localStorage.removeItem("cRPC");
  }, []);

  const solanaConfig = useMemo(() => {
    if (isProduction) {
      return SolanaMainnetConfig;
    } else {
      return SolanaDevnetConfig;
    }
  }, []);

  return {
    solanaConfig,
  };
}
