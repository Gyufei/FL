import { useSettleBidTaker } from "@/lib/hooks/contract/use-settle-bid-taker";
import SettleConfirmBtn from "./settle-confirm-btn";

export default function SettleBidTaker({
  orderStr,
  makerStr,
  preOrderStr,
}: {
  orderStr: string;
  makerStr: string;
  preOrderStr: string;
}) {
  const { isLoading, write: writeAction } = useSettleBidTaker({
    orderStr,
    makerStr,
    preOrderStr,
  });

  function handleConfirm() {
    writeAction(undefined);
  }

  return <SettleConfirmBtn disabled={isLoading} onClick={handleConfirm} />;
}
