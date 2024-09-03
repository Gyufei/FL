import { useListEth } from "./eth/use-list-eth";
import { useChainTx } from "./help/use-chain-tx";
import { useListSol } from "./solana/use-list-sol";

export function useList({
  marketplaceStr,
  makerStr,
  holdingStr,
  preOfferStr,
  originOfferStr,
  isNativeToken,
}: {
  marketplaceStr: string;
  makerStr: string;
  holdingStr: string;
  preOfferStr: string;
  originOfferStr: string;
  isNativeToken: boolean;
}) {
  const chainActionRes = useChainTx(useListEth, useListSol, {
    marketplaceStr,
    makerStr,
    holdingStr,
    preOfferStr,
    originOfferStr,
    isNativeToken,
  });

  return chainActionRes;
}
