import NP from "number-precision";
import { IOffer } from "../../types/offer";
import { useMemo } from "react";
import { IPoint, IToken } from "../../types/token";
import { formatTimeDuration } from "../../utils/time";
import useTge from "../marketplace/useTge";
import { useMakerDetail } from "../api/use-maker-detail";
// import { useTokensInfo } from "../api/use-token-info";

export function useOfferFormat({ offer }: { offer: IOffer }) {
  const { data: makerDetail, isLoading: isLoadingMakerDetail } = useMakerDetail({
    makerId: offer.maker_account
  });

  const { checkIsAfterTge, checkIsDuringTge, checkIsAfterTgePeriod } = useTge();

  const progress = Number(
    (Number(offer.used_points) / Number(offer.points)).toFixed(2),
  );

  const tokenPrice = 1;

  // const [orderTokenInfo1] = useTokensInfo([makerDetail?.token_mint || null]);
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
      if (!afterTGE) return false;
      if (isLoadingMakerDetail) return false;

      const offerType = makerDetail?.offer_settle_type;
      const isTurbo = offerType === 'turbo'

      if (isTurbo && offer.pre_offer) {
        return false;
      }

      return !["canceled", "settled"].includes(offer.offer_status) || (offer.offer_status === 'canceled' && Number(offer.used_points) > 0)
  }, [offer.offer_status, afterTGE, offer.used_points, makerDetail, isLoadingMakerDetail, offer.pre_offer]);

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
    isSettled,
    makerDetail
  };
}
