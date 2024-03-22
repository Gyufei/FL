import { useSettleAskTaker } from "@/lib/hooks/contract/use-settle-ask-taker";
import SettleConfirmBtn from "./settle-confirm-btn";
import { useEffect } from "react";

export default function SettleAskTaker({
  marketplaceStr,
  orderStr,
  makerStr,
  preOrderStr,
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
  } = useSettleAskTaker({
    marketplaceStr,
    preOrderStr,
    orderStr,
    makerStr,
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
