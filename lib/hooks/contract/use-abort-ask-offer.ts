import { useChainTx } from "./help/use-chain-tx";
import { useAbortAskOfferEth } from "./eth/use-abort-ask-offer-eth";
import { useAbortAskOfferSol } from "./solana/use-abort-ask-offer-sol";

export function useAbortAskOffer({
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
  const chainActionRes = useChainTx(useAbortAskOfferEth, useAbortAskOfferSol, {
    marketplaceStr,
    makerStr,
    offerStr,
    holdingStr,
    isNativeToken,
  });

  return chainActionRes;
}
