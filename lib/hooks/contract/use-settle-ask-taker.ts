import { useSettleAskTakerEth } from "./eth/use-settle-ask-taker-eth";
import { useChainTx } from "./help/use-chain-tx";
import { useSettleAskTakerSol } from "./solana/use-settle-ask-taker-sol";

export function useSettleAskTaker({
  marketplaceStr,
  makerStr,
  holdingStr,
  preOfferStr,
  preOfferAuthorityStr,
  isNativeToken,
}: {
  marketplaceStr: string;
  makerStr: string;
  holdingStr: string;
  preOfferStr: string;
  preOfferAuthorityStr: string;
  isNativeToken: boolean;
}) {
  const actionRes = useChainTx(useSettleAskTakerEth, useSettleAskTakerSol, {
    marketplaceStr,
    makerStr,
    holdingStr,
    preOfferStr,
    preOfferAuthorityStr,
    isNativeToken,
  });

  return actionRes;
}
