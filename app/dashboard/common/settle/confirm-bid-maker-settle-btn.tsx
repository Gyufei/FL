import { useEffect } from "react";
import ConfirmSettleBtn from "./confirm-settle-btn";
import { useSettleBidMaker } from "@/lib/hooks/contract/use-settle-bid-maker";

export default function ConfirmBidMakerSettleBtn({
  marketplaceStr,
  orderStr,
  makerStr,
  onSuccess,
}: {
  marketplaceStr: string;
  orderStr: string;
  makerStr: string;
  onSuccess: () => void;
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
      onSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return <ConfirmSettleBtn disabled={isLoading} onClick={handleConfirm} />;
}
