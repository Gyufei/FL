import ConfirmSettleBtn from "./confirm-settle-btn";
import { useSettleBidMaker } from "@/lib/hooks/contract/use-settle-bid-maker";

export default function ConfirmBidMakerSettleBtn({
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

  return <ConfirmSettleBtn disabled={isLoading} onClick={handleConfirm} />;
}
