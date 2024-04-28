import { useSettleBidMaker } from "@/lib/hooks/contract/use-settle-bid-maker";
import SettleConfirmBtn from "./settle-confirm-btn";
import { useEffect } from "react";

export default function SettleBidMaker({
  marketplaceStr,
  orderStr,
  makerStr,
  onSuccess,
}: {
  marketplaceStr: string;
  preOrderStr: string;
  orderStr: string;
  makerStr: string;
  onSuccess: () => void;
}) {
  const {
    isLoading,
    write: writeAction,
    isSuccess,
  } = useSettleBidMaker({
    marketplaceStr,
    makerStr,
    orderStr: orderStr,
  });

  function handleConfirm() {
    writeAction(undefined);
  }

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
  }, [isSuccess, onSuccess]);

  return <SettleConfirmBtn disabled={isLoading} onClick={handleConfirm} />;
}
