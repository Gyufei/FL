import ConfirmSettleBtn from "./confirm-settle-btn";
import { useSettleBidTaker } from "@/lib/hooks/contract/use-settle-bid-taker";

export default function ConfirmBidTakerSettleBtn({
  marketplaceStr,
  orderStr,
  makerStr,
  preOrderStr,
}: {
  marketplaceStr: string;
  orderStr: string;
  makerStr: string;
  preOrderStr: string;
}) {
  const { isLoading, write: writeAction } = useSettleBidTaker({
    marketplaceStr,
    orderStr,
    makerStr,
    preOrderStr,
  });

  function handleConfirm() {
    writeAction(undefined);
  }

  return <ConfirmSettleBtn disabled={isLoading} onClick={handleConfirm} />;
}
