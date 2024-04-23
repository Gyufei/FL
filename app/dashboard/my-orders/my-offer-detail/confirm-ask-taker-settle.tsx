import ConfirmSettleBtn from "./confirm-settle-btn";
import { useSettleAskTaker } from "@/lib/hooks/contract/use-settle-ask-taker";

export default function ConfirmAskTakerSettleBtn({
  marketplaceStr,
  orderStr,
  makerStr,
  preOrderStr,
  settleAmount,
}: {
  marketplaceStr: string;
  preOrderStr: string;
  orderStr: string;
  makerStr: string;
  settleAmount: number;
}) {
  const { isLoading, write: writeAction } = useSettleAskTaker({
    marketplaceStr,
    preOrderStr,
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
