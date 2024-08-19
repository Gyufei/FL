import { useCloseOfferEth } from "./eth/use-close-offer-eth";
import { useCloseOfferSol } from "./solana/use-close-offer-sol";
import { useChainTx } from "./help/use-chain-tx";

export function useCloseOffer({
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
  const chainActionRes = useChainTx(useCloseOfferEth, useCloseOfferSol, {
    marketplaceStr,
    makerStr,
    offerStr,
    stockStr,
    isSolStable,
  });

  return chainActionRes;
}
