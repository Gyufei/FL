import ConfirmSettleBtn from "@/app/[locale]/dashboard/common/settle/confirm-settle-btn";
import { useEffect } from "react";
import { useSettleAskTaker } from "@/lib/hooks/contract/use-settle-ask-taker";

export default function ConfirmAskTakerSettleBtn({
  marketplaceStr,
  stockStr,
  makerStr,
  preOfferStr,
  settleAmount,
  preOfferAuthorityStr,
  onSuccess,
  isNativeToken,
}: {
  marketplaceStr: string;
  stockStr: string;
  makerStr: string;
  preOfferStr: string;
  preOfferAuthorityStr: string;
  settleAmount: number;
  onSuccess: () => void;
  isNativeToken: boolean;
}) {
  const {
    isLoading,
    write: writeAction,
    isSuccess,
  } = useSettleAskTaker({
    marketplaceStr,
    preOfferStr,
    stockStr,
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
