import { useSettleAskMaker } from "@/lib/hooks/contract/use-settle-ask-maker";
import ConfirmSettleBtn from "../settle/confirm-settle-btn";
import { useEffect } from "react";

export default function ConfirmAskMakerSettleBtn({
  isStocksLoading,
  marketplaceStr,
  orderStr,
  makerStr,
  settleAmount,
  onSuccess,
  isSol,
}: {
  isStocksLoading: boolean;
  marketplaceStr: string;
  orderStr: string;
  makerStr: string;
  settleAmount: number;
  onSuccess: () => void;
  isSol: boolean;
}) {
  const {
    isLoading,
    write: writeAction,
    isSuccess,
  } = useSettleAskMaker({
    marketplaceStr,
    offerStr: orderStr,
    makerStr,
    isSol,
  });

  function handleConfirm() {
    if (isStocksLoading) return;

    writeAction({
      settleAmount,
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
