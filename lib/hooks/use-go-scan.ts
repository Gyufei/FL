import { ClusterType } from "../states/cluster";
import { useClusterConfig } from "./common/use-cluster-config";

export function useGoScan() {
  const { clusterConfig } = useClusterConfig();

  function handleGoScan(
    addr: string,
    type: "account" | "tx" = "account",
  ) {
    if (!addr) return;

    if (clusterConfig.type === ClusterType.Mainnet) {
      window.open(`https://solscan.io/${type}/${addr}`, "_blank");
    }

    if (clusterConfig.type === ClusterType.Devnet) {
      window.open(
        `https://solscan.io/${type}/${addr}?cluster=devnet`,
        "_blank",
      );
    }
  }

  return {
    handleGoScan,
  };
}
