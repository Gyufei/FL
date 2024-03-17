import { useSettleBidMaker } from "@/lib/hooks/contract/use-settle-bid-maker";
import SettleConfirmBtn from "./settle-confirm-btn";

export default function SettleBidMaker({
  orderStr,
  makerStr,
  preOrderStr,
}: {
  preOrderStr: string;
  orderStr: string;
  makerStr: string;
}) {
  const { isLoading, write: writeAction } = useSettleBidMaker({
    orderStr,
    makerStr,
    preOrderStr,
  });

  function handleConfirm() {
    writeAction(undefined);
  }

  return <SettleConfirmBtn disabled={isLoading} onClick={handleConfirm} />;
}
