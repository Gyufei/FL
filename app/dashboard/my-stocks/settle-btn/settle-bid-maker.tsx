import { useSettleBidMaker } from "@/lib/hooks/contract/use-settle-bid-maker";
import SettleConfirmBtn from "./settle-confirm-btn";

export default function SettleBidMaker({
  marketplaceStr,
  orderStr,
  makerStr,
  preOrderStr,
}: {
  marketplaceStr: string;
  preOrderStr: string;
  orderStr: string;
  makerStr: string;
}) {
  const { isLoading, write: writeAction } = useSettleBidMaker({
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
