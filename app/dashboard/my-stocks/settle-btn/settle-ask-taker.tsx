import { useSettleAskTaker } from "@/lib/hooks/contract/use-settle-ask-taker";
import SettleConfirmBtn from "./settle-confirm-btn";

export default function SettleAskTaker({
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

  return <SettleConfirmBtn disabled={isLoading} onClick={handleConfirm} />;
}
