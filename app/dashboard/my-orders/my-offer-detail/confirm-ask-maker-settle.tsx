import { useSettleAskMaker } from "@/lib/hooks/contract/use-settle-ask-maker";
import ConfirmSettleBtn from "./confirm-settle-btn";

export default function ConfirmAskMakerSettleBtn({
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

  return <ConfirmSettleBtn disabled={isLoading} onClick={handleConfirm} />;
}
