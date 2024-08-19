import { useCloseBidOfferEth } from "./eth/use-close-bid-offer-eth";
import { useChainTx } from "./help/use-chain-tx";
import { useCloseBidOfferSol } from "./solana/use-close-bid-offer-sol";

export function useCloseBidOffer({
  marketplaceStr,
  makerStr,
  offerStr,
  isSolStable,
}: {
  marketplaceStr: string;
  makerStr: string;
  offerStr: string;
  isSolStable: boolean;
}) {
  const chainActionRes = useChainTx(useCloseBidOfferEth, useCloseBidOfferSol, {
    marketplaceStr,
    makerStr,
    offerStr,
    isSolStable,
  });

  return chainActionRes;
}
