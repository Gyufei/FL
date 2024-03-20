import ConfirmSettleBtn from "./confirm-settle-btn";
import { useSettleAskTaker } from "@/lib/hooks/contract/use-settle-ask-taker";

export default function ConfirmAskTakerSettleBtn({
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
  const { isLoading, write: writeAction } = useSettleAskTaker({
    marketplaceStr,
    preOrderStr,
    orderStr,
    makerStr,
  });

  function handleConfirm() {
    writeAction(undefined);
  }

  return <ConfirmSettleBtn disabled={isLoading} onClick={handleConfirm} />;
}
