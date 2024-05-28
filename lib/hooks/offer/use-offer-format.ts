import NP from "number-precision";
import { IOffer } from "../../types/offer";
import { useMemo } from "react";
import { IPoint, IToken } from "../../types/token";
import { formatTimeDuration } from "../../utils/time";
import useTge from "../marketplace/useTge";

export function useOfferFormat({ offer }: { offer: IOffer }) {
  const { checkIsAfterTge, checkIsDuringTge, checkIsAfterTgePeriod } = useTge();

  const progress = Number(
    (Number(offer.used_points) / Number(offer.points)).toFixed(2),
  );

  const tokenPrice = 1;

  // const [orderTokenInfo] = useTokensInfo([makerDetail?.token_mint || null]);
  const orderTokenInfo = {
    symbol: "USDC",
    logoURI: "/icons/usdc.svg",
    decimals: 9,
  } as IToken;

  const orderPointInfo: IPoint = {
    symbol: offer.marketplace.point_name,
    logoURI: offer.marketplace.pointLogo,
    marketplaceId: offer.marketplace.market_place_id
  };

  const orderEqTokenInfo = {
    symbol: "TBA",
    logoURI: offer.marketplace.pointLogo,
    decimals: 9,
  } as IToken;

  const tokenLogo = orderTokenInfo.logoURI;
  const pointLogo = orderPointInfo.logoURI;

  const orderType = offer.offer_type;

  const amount = NP.divide(
    offer.amount,
    10 ** orderTokenInfo.decimals,
  );

  const offerValue = orderType === "ask" ? offer.points : amount;
  const forValue = orderType === "ask" ? amount : offer.points;
  const offerLogo = orderType === "ask" ? pointLogo : tokenLogo;
  const forLogo = orderType === "ask" ? tokenLogo : pointLogo;

  const tokenTotalPrice = NP.times(amount, tokenPrice);
  const pointPerPrice = NP.divide(tokenTotalPrice, offer.points);

  const orderDuration = formatTimeDuration(
    Math.floor(
      NP.minus(
        Date.now() / 1000,
        offer.create_at,
      ),
    ),
  );

  const isFilled = offer.used_points === offer.points;

  const afterTGE = useMemo(() => {
    return checkIsAfterTge(offer.marketplace.tge, Number(offer.marketplace.settlement_period));
  }, [offer.marketplace.tge, offer.marketplace.settlement_period, checkIsAfterTge]);

  const duringTGE = useMemo(() => {
    return checkIsDuringTge(offer.marketplace.tge, Number(offer.marketplace.settlement_period));
  }, [offer.marketplace.tge, offer.marketplace.settlement_period, checkIsDuringTge]);

  const afterTGEPeriod = useMemo(() => {
    return checkIsAfterTgePeriod(offer.marketplace.tge, Number(offer.marketplace.settlement_period));
  }, [offer.marketplace.tge, offer.marketplace.settlement_period, checkIsAfterTgePeriod]);

  const isCanSettle = useMemo(() => {
      return afterTGE && (!["canceled", "settled"].includes(offer.offer_status) || offer.offer_status === 'canceled' && Number(offer.used_points) > 0)
  }, [offer.offer_status, afterTGE, offer.used_points]);

  const isSettled = useMemo(() => {
    return ["settled", "finished"].includes(offer.offer_status)
  }, [offer.offer_status]);

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