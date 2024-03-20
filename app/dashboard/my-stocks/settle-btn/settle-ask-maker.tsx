import { useSettleAskMaker } from "@/lib/hooks/contract/use-settle-ask-maker";
import SettleConfirmBtn from "./settle-confirm-btn";

export default function SettleAskMaker({
  marketplaceStr,
  orderStr,
  makerStr,
}: {
  marketplaceStr: string;
  orderStr: string;
  makerStr: string;
}) {
  const { isLoading, write: writeAction } = useSettleAskMaker({
    marketplaceStr,
    orderStr,
    makerStr,
  });

  function handleConfirm() {
    writeAction(undefined);
  }

  return <SettleConfirmBtn disabled={isLoading} onClick={handleConfirm} />;
}
