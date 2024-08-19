import { useRelistOfferEth } from "./eth/use-relist-offer-eth";
import { useChainTx } from "./help/use-chain-tx";
import { useRelistOfferSol } from "./solana/use-relist-offer-sol";

export function useRelistOffer({
  marketplaceStr,
  makerStr,
  offerStr,
  stockStr,
  isSolStable,
}: {
  marketplaceStr: string;
  makerStr: string;
  offerStr: string;
  stockStr: string;
  isSolStable: boolean;
}) {
  const chainActionRes = useChainTx(useRelistOfferEth, useRelistOfferSol, {
    marketplaceStr,
    makerStr,
    offerStr,
    stockStr,
    isSolStable,
  });

  return chainActionRes;
}
