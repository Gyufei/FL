import { useEffect } from "react";
import ConfirmSettleBtn from "./confirm-settle-btn";
import { useSettleAskTaker } from "@/lib/hooks/contract/use-settle-ask-taker";

export default function ConfirmAskTakerSettleBtn({
  marketplaceStr,
  orderStr,
  makerStr,
  preOrderStr,
  settleAmount,
  onSuccess,
}: {
  marketplaceStr: string;
  preOrderStr: string;
  orderStr: string;
  makerStr: string;
  settleAmount: number;
  onSuccess: () => void;
}) {
  const {
    isLoading,
    write: writeAction,
    isSuccess,
  } = useSettleAskTaker({
    marketplaceStr,
    preOrderStr,
    orderStr,
    makerStr,
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
