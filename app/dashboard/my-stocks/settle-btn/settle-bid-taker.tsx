import { useSettleBidTaker } from "@/lib/hooks/contract/use-settle-bid-taker";
import SettleConfirmBtn from "./settle-confirm-btn";

export default function SettleBidTaker({
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

  return <SettleConfirmBtn disabled={isLoading} onClick={handleConfirm} />;
}
