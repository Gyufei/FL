import { isProduction } from "../PathMap";
import { ChainType } from "../types/chain";

export function truncateAddr(
  address: string,
  params = {
    nPrefix: 3,
    nSuffix: 3,
  },
): string {
  if (!address) return address;
  const { nPrefix, nSuffix } = params;

  const shorter = `${address.slice(0, nPrefix)}...${address.slice(
    -1 * nSuffix,
  )}`;

  return shorter;
}

export function isEvmChain(chain: ChainType) {
  return [ChainType.ETH, ChainType.BNB].includes(chain);
}

export function handleGoScan(
  chain: ChainType,
  addr: string,
  type: "account" | "tx" = "account",
) {
  if (!addr) return;

  let goType: any = type;
  if (type === "account") {
    goType = "address";
  }

  if (chain === ChainType.ETH) {
    window.open(`https://etherscan.io/${goType}/${addr}`, "_blank");
  }

  if (chain === ChainType.BNB) {
    window.open(`https://bscscan.com/${goType}/${addr}`, "_blank");
  }

  if (chain === ChainType.SOLANA) {
    window.open(
      `https://solscan.io/${type}/${addr}${
        isProduction ? "" : "?cluster=devnet"
      }`,
      "_blank",
    );
  }
}
