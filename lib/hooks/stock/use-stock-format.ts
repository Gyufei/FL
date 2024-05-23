import NP from "number-precision";
import { useMemo } from "react";
import { IPoint, IToken } from "../../types/token";
import { formatTimeDuration } from "../../utils/time";
import useTge from "../marketplace/useTge";
import { IStock } from "@/lib/types/stock";

export function useStockFormat({ stock }: { stock: IStock }) {
  const { checkIsAfterTge, checkIsDuringTge, checkIsAfterTgePeriod } = useTge();

  const tokenPrice = 1;

  // const [orderTokenInfo] = useTokensInfo([makerDetail?.token_mint || null]);
  const orderTokenInfo = {
    symbol: "USDC",
    logoURI: "/icons/usdc.svg",
    decimals: 9,
  } as IToken;

  const orderPointInfo: IPoint = {
    symbol: stock.marketplace.point_name,
    logoURI: stock.marketplace.pointLogo,
    marketplaceId: stock.marketplace.market_place_id
  };

  const orderEqTokenInfo = {
    symbol: "TBA",
    logoURI: stock.marketplace.pointLogo,
    decimals: 9,
  } as IToken;

  const tokenLogo = orderTokenInfo.logoURI;
  const pointLogo = orderPointInfo.logoURI;

  const orderType = stock.stock_type;

  const amount = NP.divide(
    stock.amount,
    10 ** orderTokenInfo.decimals,
  );

  const offerValue = orderType === "ask" ? stock.points : amount;
  const forValue = orderType === "ask" ? amount : stock.points;
  const offerLogo = orderType === "ask" ? pointLogo : tokenLogo;
  const forLogo = orderType === "ask" ? tokenLogo : pointLogo;

  const tokenTotalPrice = NP.times(amount, tokenPrice);
  const pointPerPrice = NP.divide(tokenTotalPrice, stock.points);

  const orderDuration = formatTimeDuration(
    Math.floor(
      NP.minus(
        Date.now() / 1000,
        stock.create_at,
      ),
    ),
  );

  const afterTGE = useMemo(() => {
    return checkIsAfterTge(stock.marketplace.tge, Number(stock.marketplace.settlement_period));
  }, [stock.marketplace.tge, stock.marketplace.settlement_period, checkIsAfterTge]);

  const duringTGE = useMemo(() => {
    return checkIsDuringTge(stock.marketplace.tge, Number(stock.marketplace.settlement_period));
  }, [stock.marketplace.tge, stock.marketplace.settlement_period, checkIsDuringTge]);

  const afterTGEPeriod = useMemo(() => {
    return checkIsAfterTgePeriod(stock.marketplace.tge, Number(stock.marketplace.settlement_period));
  }, [stock.marketplace.tge, stock.marketplace.settlement_period, checkIsAfterTgePeriod]);

  const isCanSettle = useMemo(() => {
      return afterTGE && !["canceled", "settled"].includes(stock.stock_status)
  }, [stock.stock_status, afterTGE]);

  const isSettled = useMemo(() => {
    return ["settled", "finished"].includes(stock.stock_status)
  }, [stock.stock_status]);

  return {
    afterTGE,
    afterTGEPeriod,
    duringTGE,
    amount,
    tokenPrice,
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
