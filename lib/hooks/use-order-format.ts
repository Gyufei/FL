import NP from "number-precision";
import { IOrder } from "../types/order";
import { useMakerDetail } from "./api/use-maker-detail";
// import { useTokensInfo } from "./api/use-token-info";
import { useOrders } from "./api/use-orders";
import { useMemo } from "react";
import { IToken } from "../types/token";
import { formatTimeDuration } from "../utils/time";

export function useOrderFormat({ order }: { order: IOrder }) {
  const { data: makerDetail } = useMakerDetail({
    makerId: order.maker_id,
  });

  const { data: orders } = useOrders({
    marketplaceId: order.marketplace?.market_place_id || "",
  });

  const subOrders = useMemo(
    () => (orders || [])?.filter((o: IOrder) => o.pre_order === order.order),
    [orders, order.order],
  );

  const { data: preOrderMakerDetail } = useMakerDetail({
    makerId: order.preOrderDetail?.maker_id || "",
  });

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

  const orderType = order.order_type;
  const tokenLogo = orderTokenInfo.logoURI;
  const pointLogo = orderPointInfo.logoURI;

  const amount = NP.divide(order.amount, 10 ** orderTokenInfo.decimals);

  const offerValue = orderType === "ask" ? order.points : amount;
  const forValue = orderType === "ask" ? amount : order.points;
  const offerLogo = orderType === "ask" ? pointLogo : tokenLogo;
  const forLogo = orderType === "ask" ? tokenLogo : pointLogo;

  const tokenTotalPrice = NP.times(amount, tokenPrice);
  const pointPerPrice = NP.divide(tokenTotalPrice, order.points);

  const orderDuration = formatTimeDuration(
    NP.minus(Date.now() / 1000, order.create_at || order.relist_at),
  );

  const isFilled = order.used_points === order.points;

  return {
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
    makerDetail,
    preOrderMakerDetail,
    subOrders,
  };
}
