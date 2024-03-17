import { useSettleAskMaker } from "@/lib/hooks/contract/use-settle-ask-maker";
import ConfirmSettleBtn from "./confirm-settle-btn";

export default function ConfirmAskMakerSettleBtn({
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

  return <ConfirmSettleBtn disabled={isLoading} onClick={handleConfirm} />;
}
