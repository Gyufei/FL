import { useCreateHoldingEth } from "./eth/use-create-holding-eth";
import { useChainTx } from "./help/use-chain-tx";
import { useCreateHoldingSol } from "./solana/use-create-holding-sol";

export function useCreateHolding({
  marketplaceStr,
  offerStr,
  makerStr,
  originOfferStr,
  originOfferAuthStr,
  preOfferAuthStr,
  referrerStr,
  isNativeToken,
}: {
  marketplaceStr: string;
  offerStr: string;
  makerStr: string;
  originOfferStr: string;
  originOfferAuthStr: string;
  preOfferAuthStr: string;
  referrerStr: string;
  isNativeToken: boolean;
}) {
  const chainActionRes = useChainTx(useCreateHoldingEth, useCreateHoldingSol, {
    marketplaceStr,
    offerStr,
    makerStr,
    originOfferStr,
    originOfferAuthStr,
    preOfferAuthStr,
    referrerStr,
    isNativeToken,
  });

  return chainActionRes;
}
