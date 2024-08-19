import { useSettleAskTakerEth } from "./eth/use-settle-ask-taker-eth";
import { useChainTx } from "./help/use-chain-tx";
import { useSettleAskTakerSol } from "./solana/use-settle-ask-taker-sol";

export function useSettleAskTaker({
  marketplaceStr,
  makerStr,
  stockStr,
  preOfferStr,
  preOfferAuthorityStr,
  isSolStable,
}: {
  marketplaceStr: string;
  makerStr: string;
  stockStr: string;
  preOfferStr: string;
  preOfferAuthorityStr: string;
  isSolStable: boolean;
}) {
  const actionRes = useChainTx(useSettleAskTakerEth, useSettleAskTakerSol, {
    marketplaceStr,
    makerStr,
    stockStr,
    preOfferStr,
    preOfferAuthorityStr,
    isSolStable,
  });

  return actionRes;
}
