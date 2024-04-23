import { useSettleAskMaker } from "@/lib/hooks/contract/use-settle-ask-maker";
import ConfirmSettleBtn from "./confirm-settle-btn";

export default function ConfirmAskMakerSettleBtn({
  marketplaceStr,
  orderStr,
  makerStr,
  settleAmount,
}: {
  marketplaceStr: string;
  orderStr: string;
  makerStr: string;
  settleAmount: number;
}) {
  const { isLoading, write: writeAction } = useSettleAskMaker({
    marketplaceStr,
    orderStr,
    makerStr,
  });

  function handleConfirm() {
    writeAction({
      settleAmount: settleAmount,
    });
  }

  return <ConfirmSettleBtn disabled={isLoading} onClick={handleConfirm} />;
}
