import { useRelistOfferEth } from "./eth/use-relist-offer-eth";
import { useChainTx } from "./help/use-chain-tx";
import { useRelistOfferSol } from "./solana/use-relist-offer-sol";

export function useRelistOffer({
  marketplaceStr,
  makerStr,
  offerStr,
  stockStr,
  isNativeToken,
}: {
  marketplaceStr: string;
  makerStr: string;
  offerStr: string;
  stockStr: string;
  isNativeToken: boolean;
}) {
  const chainActionRes = useChainTx(useRelistOfferEth, useRelistOfferSol, {
    marketplaceStr,
    makerStr,
    offerStr,
    stockStr,
    isNativeToken,
  });

  return chainActionRes;
}
