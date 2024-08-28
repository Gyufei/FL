import { DevnetCluster, MainnetCluster } from "@/lib/const/solana";
import { isProduction } from "@/lib/PathMap";
import { useEffect, useMemo } from "react";

export function useSolanaConfig() {
  useEffect(() => {
    localStorage.removeItem("cluster");
  }, []);

  const clusterConfig = useMemo(() => {
    if (isProduction) {
      return MainnetCluster;
    } else {
      return DevnetCluster;
    }
  }, []);

  return {
    clusterConfig,
  };
}
