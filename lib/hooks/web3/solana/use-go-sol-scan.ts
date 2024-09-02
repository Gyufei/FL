import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useSolanaConfig } from "@/lib/hooks/web3/solana/use-solana-config";
import { useCurrentChain } from "@/lib/hooks/web3/use-current-chain";

export function useGoSolScan() {
  const { isEth, isSolana } = useCurrentChain();
  const { solanaConfig: clusterConfig } = useSolanaConfig();

  function handleGoScan(addr: string, type: "account" | "tx" = "account") {
    if (!addr) return;

    if (isEth) {
      window.open(`https://etherscan.io/${type}/${addr}`, "_blank");
    }

    if (isSolana) {
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
  }

  return {
    handleGoScan,
  };
}
