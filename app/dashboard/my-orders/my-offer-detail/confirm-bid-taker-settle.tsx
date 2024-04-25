import { useEffect } from "react";
import ConfirmSettleBtn from "./confirm-settle-btn";
import { useSettleBidTaker } from "@/lib/hooks/contract/use-settle-bid-taker";

export default function ConfirmBidTakerSettleBtn({
  marketplaceStr,
  orderStr,
  makerStr,
  preOrderStr,
  onDone,
}: {
  marketplaceStr: string;
  orderStr: string;
  makerStr: string;
  preOrderStr: string;
  onDone: () => void;
}) {
  const {
    isLoading,
    write: writeAction,
    isSuccess,
  } = useSettleBidTaker({
    marketplaceStr,
    orderStr,
    makerStr,
    preOrderStr,
  });

  function handleConfirm() {
    writeAction(undefined);
  }

  useEffect(() => {
    if (isSuccess) {
      onDone();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return <ConfirmSettleBtn disabled={isLoading} onClick={handleConfirm} />;
}
