import ConfirmSettleBtn from "@/app/[locale]/dashboard/common/settle/confirm-settle-btn";
import { useEffect } from "react";
import { useSettleAskTaker } from "@/lib/hooks/contract/use-settle-ask-taker";
import { ChainType } from "@/lib/types/chain";

export default function ConfirmAskTakerSettleBtn({
  chain,
  marketplaceStr,
  holdingStr,
  makerStr,
  preOfferStr,
  settleAmount,
  isNativeToken,
  preOfferAuthorityStr,
  onSuccess,
}: {
  chain: ChainType;
  marketplaceStr: string;
  holdingStr: string;
  makerStr: string;
  preOfferStr: string;
  preOfferAuthorityStr: string;
  isNativeToken: boolean;
  settleAmount: number;
  onSuccess: () => void;
}) {
  const {
    isLoading,
    write: writeAction,
    isSuccess,
  } = useSettleAskTaker({
    chain,
    marketplaceStr,
    preOfferStr,
    holdingStr,
    preOfferAuthorityStr,
    makerStr,
    isNativeToken,
  });

  function handleConfirm() {
    writeAction({
      settleAmount: settleAmount,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return <ConfirmSettleBtn disabled={isLoading} onClick={handleConfirm} />;
}
