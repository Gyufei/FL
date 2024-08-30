import { useRelistEth } from "./eth/use-relist-eth";
import { useChainTx } from "./help/use-chain-tx";
import { useRelistSol } from "./solana/use-relist-sol";

export function useRelist({
  marketplaceStr,
  makerStr,
  offerStr,
  holdingStr,
  isNativeToken,
}: {
  marketplaceStr: string;
  makerStr: string;
  offerStr: string;
  holdingStr: string;
  isNativeToken: boolean;
}) {
  const chainActionRes = useChainTx(useRelistEth, useRelistSol, {
    marketplaceStr,
    makerStr,
    offerStr,
    holdingStr,
    isNativeToken,
  });

  return chainActionRes;
}
