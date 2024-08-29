import { useCloseOfferEth } from "./eth/use-close-offer-eth";
import { useCloseOfferSol } from "./solana/use-close-offer-sol";
import { useChainTx } from "./help/use-chain-tx";

export function useCloseOffer({
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
  const chainActionRes = useChainTx(useCloseOfferEth, useCloseOfferSol, {
    marketplaceStr,
    makerStr,
    offerStr,
    holdingStr,
    isNativeToken,
  });

  return chainActionRes;
}
