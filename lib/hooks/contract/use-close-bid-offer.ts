import { useCloseBidOfferEth } from "./eth/use-close-bid-offer-eth";
import { useChainTx } from "./help/use-chain-tx";
import { useCloseBidOfferSol } from "./solana/use-close-bid-offer-sol";

export function useCloseBidOffer({
  marketplaceStr,
  makerStr,
  offerStr,
  isNativeToken,
}: {
  marketplaceStr: string;
  makerStr: string;
  offerStr: string;
  isNativeToken: boolean;
}) {
  const chainActionRes = useChainTx(useCloseBidOfferEth, useCloseBidOfferSol, {
    marketplaceStr,
    makerStr,
    offerStr,
    isNativeToken,
  });

  return chainActionRes;
}
