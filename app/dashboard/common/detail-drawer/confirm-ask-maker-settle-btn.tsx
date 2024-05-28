import { useSettleAskMaker } from "@/lib/hooks/contract/use-settle-ask-maker";
import ConfirmSettleBtn from "../settle/confirm-settle-btn";
import { useEffect, useMemo } from "react";

export default function ConfirmAskMakerSettleBtn({
  isStocksLoading,
  marketplaceStr,
  orderStr,
  makerStr,
  settleAmount,
  offerStocks,
  isDirect,
  onSuccess,
}: {
  isStocksLoading: boolean;
  marketplaceStr: string;
  orderStr: string;
  makerStr: string;
  settleAmount: number;
  offerStocks: Array<Record<string, any>>;
  isDirect: boolean;
  onSuccess: () => void;
}) {
  const {
    isLoading,
    write: writeAction,
    isSuccess,
  } = useSettleAskMaker({
    marketplaceStr,
    offerStr: orderStr,
    makerStr,
  });

  const stockArr = useMemo(() => {
    return offerStocks.map((s) => {
      return {
        stock_account: s.stock_account,
        offer: s.offer,
        authority: s.authority,
      };
    });
  }, [offerStocks]);

  function handleConfirm() {
    if (isStocksLoading) return;

    writeAction({
      settleAmount,
      stockArr,
      isDirect,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return <ConfirmSettleBtn disabled={isLoading} onClick={handleConfirm} />;
}
