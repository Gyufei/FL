import { useCurrentChain } from "@/lib/hooks/web3/use-current-chain";
import { isProduction } from "@/lib/PathMap";

export function useGoScan() {
  const { isEth, isBsc, isSolana } = useCurrentChain();

  function handleGoScan(addr: string, type: "account" | "tx" = "account") {
    if (!addr) return;

    let goType: any = type;
    if (type === "account") {
      goType = "address";
    }

    if (isEth) {
      window.open(`https://etherscan.io/${goType}/${addr}`, "_blank");
    }

    if (isBsc) {
      window.open(`https://bscscan.com/${goType}/${addr}`, "_blank");
    }

    if (isSolana) {
      window.open(
        `https://solscan.io/${type}/${addr}${
          isProduction ? "" : "?cluster=devnet"
        }`,
        "_blank",
      );
    }
  }

  return {
    handleGoScan,
  };
}
