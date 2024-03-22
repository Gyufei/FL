import { useSettleBidTaker } from "@/lib/hooks/contract/use-settle-bid-taker";
import SettleConfirmBtn from "./settle-confirm-btn";
import { useEffect } from "react";

export default function SettleBidTaker({
  marketplaceStr,
  orderStr,
  makerStr,
  preOrderStr,
  onSuccess,
}: {
  marketplaceStr: string;
  orderStr: string;
  makerStr: string;
  preOrderStr: string;
  onSuccess: () => void;
}) {
  const {
    isLoading,
    write: writeAction,
    isSuccess,
  } = useSettleBidTaker({
    marketplaceStr,
    orderStr,
    makerStr,
    preOrderStr,
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
