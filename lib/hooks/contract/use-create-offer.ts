import { useCreateOfferSol } from "./solana/use-create-offer-sol";
import { useCreateOfferEth } from "./eth/use-create-offer-eth";
import { useChainTx } from "./help/use-chain-tx";

export function useCreateOffer({
  marketplaceStr: marketplaceStr,
  offerType,
}: {
  marketplaceStr: string;
  offerType: "bid" | "ask";
}) {
  const chainActionRes = useChainTx(useCreateOfferEth, useCreateOfferSol, {
    marketplaceStr,
    offerType,
  });


  return chainActionRes;
}
