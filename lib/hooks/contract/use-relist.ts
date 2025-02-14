import { ChainType } from "@/lib/types/chain";
import { useRelistEth } from "./eth/use-relist-eth";
import { useChainTx } from "./help/use-chain-tx";

export function useRelist({
  chain,
  marketplaceStr,
  makerStr,
  offerStr,
  holdingStr,
  isNativeToken,
}: {
  chain: ChainType;
  marketplaceStr: string;
  makerStr: string;
  offerStr: string;
  holdingStr: string;
  isNativeToken: boolean;
}) {
  const chainActionRes = useChainTx(chain, useRelistEth, {
    chain,
    marketplaceStr,
    makerStr,
    offerStr,
    holdingStr,
    isNativeToken,
  });

  return chainActionRes;
}
