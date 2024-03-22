import NP from "number-precision";
import { IOrder } from "../types/order";
import { useMakerDetail } from "./api/use-maker-detail";
// import { useTokensInfo } from "./api/use-token-info";
import { useMarketplaceOrders } from "./api/use-marketplace-orders";
import { useMemo } from "react";
import { IToken } from "../types/token";
import { formatTimeDuration } from "../utils/time";

export function useOrderFormat({ order }: { order: IOrder }) {
  const { data: makerDetail } = useMakerDetail({
    makerId: order.maker_id,
  });

  const { data: orders } = useMarketplaceOrders({
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
    Math.floor(
      NP.minus(
        Date.now() / 1000,
        new Date(order.create_at || order.relist_at).getTime() / 1000,
      ),
    ),
  );

  const isFilled = order.used_points === order.points;

  function getOrigin(order: IOrder, defaultValue: string) {
    if (order.preOrderDetail) {
      return getOrigin(order.preOrderDetail, order.pre_order);
    } else {
      return defaultValue;
    }
  }

  const orderRole = useMemo(() => {
    if (order.pre_order == "0") {
      return "Maker";
    } else {
      return "Taker";
    }
  }, [order]);

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
    getOrigin,
    orderRole,
  };
}
