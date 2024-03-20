import ConfirmSettleBtn from "./confirm-settle-btn";
import { useSettleBidMaker } from "@/lib/hooks/contract/use-settle-bid-maker";

export default function ConfirmBidMakerSettleBtn({
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

  return <ConfirmSettleBtn disabled={isLoading} onClick={handleConfirm} />;
}
