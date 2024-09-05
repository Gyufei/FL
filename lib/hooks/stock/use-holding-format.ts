import { useMemo } from "react";
import { IHolding } from "@/lib/types/holding";
import { useOfferFormat } from "../offer/use-offer-format";
import { IOffer } from "@/lib/types/offer";

export function useHoldingFormat({ stock }: { stock: IHolding }) {
  const {
    afterTGE,
    afterTGEPeriod,
    duringTGE,
    amount,
    orderDuration,
    tokenTotalPrice,
    tokenPrice,
    pointPerPrice,
    orderPointInfo,
    orderTokenInfo,
    orderEqTokenInfo,
    makerDetail,
    isNativeToken,
  } = useOfferFormat({
    offer: stock as unknown as IOffer,
  });

  const stockType = stock.stock_type;

  const tokenLogo = orderTokenInfo?.logoURI || "/icons/empty.svg";
  const pointLogo = orderPointInfo?.logoURI || "/icons/empty.svg";

  const offerValue = stockType === "ask" ? stock.points : amount;
  const forValue = stockType === "ask" ? amount : stock.points;
  const offerLogo = stockType === "ask" ? pointLogo : tokenLogo;
  const forLogo = stockType === "ask" ? tokenLogo : pointLogo;

  const isCanSettle = useMemo(() => {
    return (
      afterTGE &&
      !["finished"].includes(stock.stock_status) &&
      stockType === "ask"
    );
  }, [stock.stock_status, afterTGE, stockType]);

  const isSettled = useMemo(() => {
    return ["settled", "finished"].includes(stock.stock_status);
  }, [stock.stock_status]);

  return {
    afterTGE,
    afterTGEPeriod,
    duringTGE,
    amount,
    offerValue,
    forValue,
    offerLogo,
    forLogo,
    orderDuration,
    tokenTotalPrice,
    pointPerPrice,
    orderPointInfo,
    orderTokenInfo,
    orderEqTokenInfo,
    isCanSettle,
    isSettled,
    tokenPrice,
    makerDetail,
    isNativeToken,
  };
}
