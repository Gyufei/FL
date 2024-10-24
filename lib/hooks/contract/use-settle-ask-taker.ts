import { ChainType } from "@/lib/types/chain";
import { useSettleAskTakerEth } from "./eth/use-settle-ask-taker-eth";
import { useChainTx } from "./help/use-chain-tx";
import { useSettleAskTakerSol } from "./solana/use-settle-ask-taker-sol";

export function useSettleAskTaker({
  chain,
  marketplaceStr,
  makerStr,
  holdingStr,
  preOfferStr,
  preOfferAuthorityStr,
  isNativeToken,
}: {
  chain: ChainType;
  marketplaceStr: string;
  makerStr: string;
  holdingStr: string;
  preOfferStr: string;
  preOfferAuthorityStr: string;
  isNativeToken: boolean;
}) {
  const actionRes = useChainTx(useSettleAskTakerEth, useSettleAskTakerSol, {
    chain,
    marketplaceStr,
    makerStr,
    holdingStr,
    preOfferStr,
    preOfferAuthorityStr,
    isNativeToken,
  });

  return actionRes;
}
