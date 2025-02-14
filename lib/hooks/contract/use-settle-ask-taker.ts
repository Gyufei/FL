import { ChainType } from "@/lib/types/chain";
import { useSettleAskTakerEth } from "./eth/use-settle-ask-taker-eth";
import { useChainTx } from "./help/use-chain-tx";

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
  const actionRes = useChainTx(
    chain,
    useSettleAskTakerEth,
    {
      chain,
      marketplaceStr,
      makerStr,
      holdingStr,
      preOfferStr,
      preOfferAuthorityStr,
      isNativeToken,
    },
  );

  return actionRes;
}
