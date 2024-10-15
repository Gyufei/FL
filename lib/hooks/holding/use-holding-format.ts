import { useMemo } from "react";
import { IHolding } from "@/lib/types/holding";
import { useOfferFormat } from "../offer/use-offer-format";
import { IOffer } from "@/lib/types/offer";

export function useHoldingFormat({ holding }: { holding: IHolding }) {
  const {
    afterTGE,
    afterTGEPeriod,
    duringTGE,
    amount,
    orderDuration,
    tokenTotalPrice,
    tokenPrice,
    pointPerPrice,
    offerPointInfo: orderPointInfo,
    offerTokenInfo: orderTokenInfo,
    offerEqTokenInfo,
    makerDetail,
    isNativeToken,
  } = useOfferFormat({
    offer: holding as unknown as IOffer,
  });

  const holdingType = holding.stock_type;

  const tokenLogo = orderTokenInfo?.logoURI || "/icons/empty.svg";
  const pointLogo = orderPointInfo?.logoURI || "/icons/empty.svg";

  const offerValue = holdingType === "ask" ? holding.points : amount;
  const forValue = holdingType === "ask" ? amount : holding.points;
  const offerLogo = holdingType === "ask" ? pointLogo : tokenLogo;
  const forLogo = holdingType === "ask" ? tokenLogo : pointLogo;

  const isCanSettle = useMemo(() => {
    return (
      afterTGE &&
      !["finished"].includes(holding.stock_status) &&
      holdingType === "ask"
    );
  }, [holding.stock_status, afterTGE, holdingType]);

  const isSettled = useMemo(() => {
    return ["settled", "finished"].includes(holding.stock_status);
  }, [holding.stock_status]);

  const isCanAbort = useMemo(() => {
    return (
      holdingType === "bid" &&
      ["initialized"].includes(holding.stock_status) &&
      holding.pre_offer_detail &&
      holding.pre_offer_detail?.abort_offer_status === "aborted"
    );
  }, [holding, holdingType]);

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
    offerEqTokenInfo,
    tokenPrice,
    makerDetail,
    isNativeToken,
    isCanSettle,
    isSettled,
    isCanAbort,
  };
}
