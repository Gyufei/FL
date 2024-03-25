import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useClusterConfig } from "./use-cluster-config";

export function useGoScan() {
  const { clusterConfig } = useClusterConfig();

  function handleGoScan(addr: string, type: "account" | "tx" = "account") {
    if (!addr) return;

    if (clusterConfig.network === WalletAdapterNetwork.Mainnet) {
      window.open(`https://solscan.io/${type}/${addr}`, "_blank");
    }

    if (clusterConfig.network === WalletAdapterNetwork.Devnet) {
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
