import { useSettleAskMaker } from "@/lib/hooks/contract/use-settle-ask-maker";
import SettleConfirmBtn from "./settle-confirm-btn";

export default function SettleAskMaker({
  orderStr,
  makerStr,
}: {
  orderStr: string;
  makerStr: string;
}) {
  const { isLoading, write: writeAction } = useSettleAskMaker({
    orderStr,
    makerStr,
  });

  function handleConfirm() {
    writeAction(undefined);
  }

  return <SettleConfirmBtn disabled={isLoading} onClick={handleConfirm} />;
}
