import { useEffect } from "react";
import ConfirmSettleBtn from "./confirm-settle-btn";
import { useSettleBidMaker } from "@/lib/hooks/contract/use-settle-bid-maker";

export default function ConfirmBidMakerSettleBtn({
  marketplaceStr,
  orderStr,
  makerStr,
  onDone,
}: {
  marketplaceStr: string;
  orderStr: string;
  makerStr: string;
  onDone: () => void;
}) {
  const {
    isLoading,
    write: writeAction,
    isSuccess,
  } = useSettleBidMaker({
    marketplaceStr,
    makerStr,
    orderStr,
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
