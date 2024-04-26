import NP from "number-precision";
import { IOrder } from "../../types/order";
// import { useTokensInfo } from "./api/use-token-info";
import { useMemo } from "react";
import { IToken } from "../../types/token";
import { convertUTCToLocalStamp, formatTimeDuration } from "../../utils/time";
import useTge from "../marketplace/useTge";

export function useOrderFormat({ order }: { order: IOrder }) {
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

  // const [orderPointInfo] = useTokensInfo([order.marketplace.token_mint]);
  const orderPointInfo = {
    symbol: "POINTS",
    logoURI: "/icons/point.svg",
  } as IToken;

  // const [orderPointInfo] = useTokensInfo([order.marketplace.token_mint]);
  const orderEqTokenInfo = {
    symbol: "TBA",
    logoURI: "/icons/point.svg",
    decimals: 9,
  } as IToken;

  const tokenLogo = orderTokenInfo.logoURI;
  const pointLogo = orderPointInfo.logoURI;

  const orderType = order.order_type;

  const takerAmount = NP.divide(
    order.taker_amount,
    10 ** orderTokenInfo.decimals,
  );
  const makerAmount = NP.divide(
    order.maker_amount,
    10 ** orderTokenInfo.decimals,
  );

  const amount = order.order_role !== "Maker" ? takerAmount : makerAmount;

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
        convertUTCToLocalStamp(order.relist_at || order.create_at) / 1000,
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
    const role = order.order_role;
    if (role === 'Taker')  {
      return afterTGE && !["finished", "settled"].includes(order.taker_status)
    } else {
      return afterTGE && !["canceled", "settled"].includes(order.maker_status)
    }
  }, [order.maker_status, order.taker_status, order.order_role, afterTGE]);

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
    takerAmount,
    isCanSettle,
    makerAmount,
  };
}
