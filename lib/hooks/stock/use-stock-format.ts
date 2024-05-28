import { useMemo } from "react";
import { IStock } from "@/lib/types/stock";
import { useOfferFormat } from "../offer/use-offer-format";
import { IOffer } from "@/lib/types/offer";

export function useStockFormat({ stock }: { stock: IStock }) {
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
    makerDetail
  } = useOfferFormat({
    offer: stock as unknown as IOffer
  })

  const stockType = stock.stock_type;

  const tokenLogo = orderTokenInfo.logoURI;
  const pointLogo = orderPointInfo.logoURI;

  const offerValue = stockType === "ask" ? stock.points : amount;
  const forValue = stockType === "ask" ? amount : stock.points;
  const offerLogo = stockType === "ask" ? pointLogo : tokenLogo;
  const forLogo = stockType === "ask" ? tokenLogo : pointLogo;

  const isCanSettle = useMemo(() => {
      return afterTGE && !["finished"].includes(stock.stock_status) && stockType === "ask";
  }, [stock.stock_status, afterTGE, stockType]);

  const isSettled = useMemo(() => {
    return ["settled", "finished"].includes(stock.stock_status)
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
    makerDetail
  };
}
