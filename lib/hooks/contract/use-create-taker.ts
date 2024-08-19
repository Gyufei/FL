import { useCreateTakerEth } from "./eth/use-create-taker-eth";
import { useChainTx } from "./help/use-chain-tx";
import { useCreateTakerSol } from "./solana/use-create-taker-sol";

export function useCreateTaker({
  marketplaceStr,
  offerStr,
  makerStr,
  originOfferStr,
  originOfferAuthStr,
  preOfferAuthStr,
  referrerStr,
  isSolStable,
}: {
  marketplaceStr: string;
  offerStr: string;
  makerStr: string;
  originOfferStr: string;
  originOfferAuthStr: string;
  preOfferAuthStr: string;
  referrerStr: string;
  isSolStable: boolean;
}) {
  const chainActionRes = useChainTx(useCreateTakerEth, useCreateTakerSol, {
    marketplaceStr,
    offerStr,
    makerStr,
    originOfferStr,
    originOfferAuthStr,
    preOfferAuthStr,
    referrerStr,
    isSolStable,
  });

  return chainActionRes;
}
