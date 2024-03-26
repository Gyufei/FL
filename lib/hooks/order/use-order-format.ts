import NP from "number-precision";
import { IOrder } from "../../types/order";
// import { useTokensInfo } from "./api/use-token-info";
import { useMemo } from "react";
import { IToken } from "../../types/token";
import { formatTimeDuration } from "../../utils/time";

export function useOrderFormat({ order }: { order: IOrder }) {
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

  const orderRole = order.order_role;

  const isMaker = useMemo(() => {
    return order.order_role === "Maker";
  }, [order]);

  const isTaker = useMemo(() => {
    return !isMaker;
  }, [isMaker]);

  console.log(orderRole, isTaker, isMaker);

  const orderType = order.order_type;

  const takerAmount = NP.divide(
    order.taker_amount,
    10 ** orderTokenInfo.decimals,
  );
  const makerAmount = NP.divide(
    order.maker_amount,
    10 ** orderTokenInfo.decimals,
  );

  const amount = isTaker ? takerAmount : makerAmount;
  console.log(order, isTaker, amount);

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
        new Date(order.create_at || order.relist_at).getTime() / 1000,
      ),
    ),
  );

  const isFilled = order.used_points === order.points;

  const afterTGE = useMemo(() => {
    const tgeTime = order.marketplace.tge;
    if (tgeTime === "0") {
      return false;
    }

    const tgeTimeNum = Number(tgeTime);
    const now = Date.now() / 1000;
    return now > tgeTimeNum;
  }, [order.marketplace.tge]);

  return {
    afterTGE,
    isFilled,
    amount,
    tokenPrice,
    orderType,
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
    orderRole,
    isMaker,
    isTaker,
  };
}
