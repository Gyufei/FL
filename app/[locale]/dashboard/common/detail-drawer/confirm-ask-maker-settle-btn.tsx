import { useSettleAskMaker } from "@/lib/hooks/contract/use-settle-ask-maker";
import ConfirmSettleBtn from "../settle/confirm-settle-btn";
import { useEffect } from "react";

export default function ConfirmAskMakerSettleBtn({
  isHoldingsLoading,
  marketplaceStr,
  orderStr,
  makerStr,
  settleAmount,
  onSuccess,
}: {
  isHoldingsLoading: boolean;
  marketplaceStr: string;
  orderStr: string;
  makerStr: string;
  settleAmount: number;
  onSuccess: () => void;
}) {
  console.log({
    marketplaceStr,
    offerStr: orderStr,
    makerStr,
    settleAmount,
    // isNativeToken,
  });
  const { isLoading, write: writeAction, isSuccess } = useSettleAskMaker();

  function handleConfirm() {
    if (isHoldingsLoading) return;

    writeAction();
    //   {
    //   settleAmount,
    // }
  }

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return <ConfirmSettleBtn disabled={isLoading} onClick={handleConfirm} />;
}
