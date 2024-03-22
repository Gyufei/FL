import { useSettleAskMaker } from "@/lib/hooks/contract/use-settle-ask-maker";
import SettleConfirmBtn from "./settle-confirm-btn";
import { useEffect } from "react";

export default function SettleAskMaker({
  marketplaceStr,
  orderStr,
  makerStr,
  onSuccess,
}: {
  marketplaceStr: string;
  orderStr: string;
  makerStr: string;
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
    writeAction(undefined);
  }

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
  }, [isSuccess, onSuccess]);

  return <SettleConfirmBtn disabled={isLoading} onClick={handleConfirm} />;
}
