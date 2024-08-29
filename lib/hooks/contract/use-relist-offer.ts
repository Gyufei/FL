import { useRelistOfferEth } from "./eth/use-relist-offer-eth";
import { useChainTx } from "./help/use-chain-tx";
import { useRelistOfferSol } from "./solana/use-relist-offer-sol";

export function useRelistOffer({
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
  const chainActionRes = useChainTx(useRelistOfferEth, useRelistOfferSol, {
    marketplaceStr,
    makerStr,
    offerStr,
    holdingStr,
    isNativeToken,
  });

  return chainActionRes;
}
