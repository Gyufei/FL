import NP from "number-precision";
import { IOffer } from "../../types/order";
import { useMemo } from "react";
import { IPoint, IToken } from "../../types/token";
import { convertUTCToLocalStamp, formatTimeDuration } from "../../utils/time";
import useTge from "../marketplace/useTge";

export function useOfferFormat({ order }: { order: IOffer }) {
  const { checkIsAfterTge, checkIsDuringTge, checkIsAfterTgePeriod } = useTge();

  const progress = Number(
    (Number(order.used_points) / Number(order.points)).toFixed(2),
  );

  const tokenPrice = 1;

  // const [orderTokenInfo] = useTokensInfo([makerDetail?.token_mint || null]);
  const orderTokenInfo = {
    symbol: "USDC",
    logoURI: "/icons/usdc.svg",
    decimals: 9,
  } as IToken;

  const orderPointInfo: IPoint = {
    symbol: order.marketplace.point_name,
    logoURI: order.marketplace.pointLogo,
    marketplaceId: order.marketplace.market_place_id
  };

  const orderEqTokenInfo = {
    symbol: "TBA",
    logoURI: order.marketplace.pointLogo,
    decimals: 9,
  } as IToken;

  const tokenLogo = orderTokenInfo.logoURI;
  const pointLogo = orderPointInfo.logoURI;

  const orderType = order.offer_type;

  const amount = NP.divide(
    order.amount,
    10 ** orderTokenInfo.decimals,
  );

  const offerValue = orderType === "ask" ? order.points : amount;
  const forValue = orderType === "ask" ? amount : order.points;
  const offerLogo = orderType === "ask" ? pointLogo : tokenLogo;
  const forLogo = orderType === "ask" ? tokenLogo : pointLogo;

  const tokenTotalPrice = NP.times(amount, tokenPrice);
  const pointPerPrice = NP.divide(tokenTotalPrice, order.points);

  const orderDuration = formatTimeDuration(
    Math.floor(
      NP.minus(
        Date.now() / 1000,
        convertUTCToLocalStamp(order.create_at) / 1000,
      ),
    ),
  );

  const isFilled = order.used_points === order.points;

  const afterTGE = useMemo(() => {
    return checkIsAfterTge(order.marketplace.tge, Number(order.marketplace.settlement_period));
  }, [order.marketplace.tge, order.marketplace.settlement_period, checkIsAfterTge]);

  const duringTGE = useMemo(() => {
    return checkIsDuringTge(order.marketplace.tge, Number(order.marketplace.settlement_period));
  }, [order.marketplace.tge, order.marketplace.settlement_period, checkIsDuringTge]);

  const afterTGEPeriod = useMemo(() => {
    return checkIsAfterTgePeriod(order.marketplace.tge, Number(order.marketplace.settlement_period));
  }, [order.marketplace.tge, order.marketplace.settlement_period, checkIsAfterTgePeriod]);

  const isCanSettle = useMemo(() => {
      return afterTGE && !["canceled", "settled"].includes(order.offer_status)
  }, [order.offer_status, afterTGE]);

  const isSettled = useMemo(() => {
    return ["settled", "finished"].includes(order.offer_status)
  }, [order.offer_status]);

  return {
    afterTGE,
    afterTGEPeriod,
    duringTGE,
    isFilled,
    amount,
    tokenPrice,
    progress,
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
    isSettled
  };
}
