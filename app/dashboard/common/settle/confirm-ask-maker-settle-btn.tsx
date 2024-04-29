import { useSettleAskMaker } from "@/lib/hooks/contract/use-settle-ask-maker";
import ConfirmSettleBtn from "./confirm-settle-btn";
import { useEffect } from "react";

export default function ConfirmAskMakerSettleBtn({
  marketplaceStr,
  orderStr,
  makerStr,
  settleAmount,
  onSuccess,
}: {
  marketplaceStr: string;
  orderStr: string;
  makerStr: string;
  settleAmount: number;
  onSuccess: () => void;
}) {
  const {
    isLoading,
    write: writeAction,
    isSuccess,
  } = useSettleAskMaker({
    marketplaceStr,
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
