import ConfirmSettleBtn from "./confirm-settle-btn";
import { useSettleBidTaker } from "@/lib/hooks/contract/use-settle-bid-taker";

export default function ConfirmBidTakerSettleBtn({
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

  return <ConfirmSettleBtn disabled={isLoading} onClick={handleConfirm} />;
}
