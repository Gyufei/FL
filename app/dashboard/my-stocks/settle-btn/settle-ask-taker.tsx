import { useSettleAskTaker } from "@/lib/hooks/contract/use-settle-ask-taker";
import SettleConfirmBtn from "./settle-confirm-btn";

export default function SettleAskTaker({
  orderStr,
  makerStr,
  preOrderStr,
}: {
  preOrderStr: string;
  orderStr: string;
  makerStr: string;
}) {
  const { isLoading, write: writeAction } = useSettleAskTaker({
    preOrderStr,
    orderStr,
    makerStr,
  });

  function handleConfirm() {
    writeAction(undefined);
  }

  return <SettleConfirmBtn disabled={isLoading} onClick={handleConfirm} />;
}
