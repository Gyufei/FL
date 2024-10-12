import NP from "number-precision";
import { IOffer } from "../../types/offer";
import { useMemo } from "react";
import { IPoint, IToken } from "../../types/token";
import { formatTimeDuration } from "../../utils/time";
import useTge from "../marketplace/useTge";
import { useMakerDetail } from "@/lib/hooks/api/use-maker-detail";
import { isProduction } from "@/lib/PathMap";
import { useTokensInfo } from "@/lib/hooks/api/token/use-token-info";
import { useTokenPrice } from "@/lib/hooks/api/token/use-token-price";
import { useIsNativeToken } from "../api/token/use-is-native-token";

export function useOfferFormat({ offer }: { offer: IOffer }) {
  const { data: makerDetail, isLoading: isLoadingMakerDetail } = useMakerDetail(
    {
      makerId: offer.maker_account,
    },
  );

  const { checkIsAfterTge, checkIsDuringTge, checkIsAfterTgePeriod } = useTge();

  const [orderTokenInfo] = useTokensInfo([makerDetail?.token_mint || null]);

  const { isNativeToken } = useIsNativeToken(orderTokenInfo || null);

  const { data: tokenPrice } = useTokenPrice(orderTokenInfo?.address || "");

  const orderPointInfo: IPoint = {
    symbol: offer.marketplace.item_name,
    logoURI: offer.marketplace.pointLogo,
    marketplaceId: offer.marketplace.market_place_id,
    marketName: offer.marketplace.market_name,
  };

  const orderEqTokenInfo = {
    symbol: "TBA",
    logoURI: offer.marketplace.pointLogo,
    decimals: 9,
  } as IToken;

  const tokenLogo = orderTokenInfo?.logoURI || "/icons/empty.svg";
  const pointLogo = orderPointInfo?.logoURI || "/icons/empty.svg";

  const amount = NP.divide(
    offer.amount,
    10 ** (orderTokenInfo?.decimals || (isProduction ? 6 : 9)),
  );

  const progress = Number(
    (Number(offer.used_points) / Number(offer.points)).toFixed(2),
  );

  const offerType = offer.offer_type;
  const offerValue = offerType === "ask" ? offer.points : amount;
  const forValue = offerType === "ask" ? amount : offer.points;
  const offerLogo = offerType === "ask" ? pointLogo : tokenLogo;
  const forLogo = offerType === "ask" ? tokenLogo : pointLogo;

  const tokenTotalPrice = NP.times(amount, tokenPrice);
  const pointPerPrice = NP.divide(tokenTotalPrice, offer.points);

  const orderDuration = formatTimeDuration(
    Math.floor(NP.minus(Date.now() / 1000, offer.create_at)),
  );

  const isFilled = offer.used_points === offer.points;

  const afterTGE = useMemo(() => {
    return checkIsAfterTge(
      offer.marketplace.tge,
      Number(offer.marketplace.settlement_period),
    );
  }, [
    offer.marketplace.tge,
    offer.marketplace.settlement_period,
    checkIsAfterTge,
  ]);

  const duringTGE = useMemo(() => {
    return checkIsDuringTge(
      offer.marketplace.tge,
      Number(offer.marketplace.settlement_period),
    );
  }, [
    offer.marketplace.tge,
    offer.marketplace.settlement_period,
    checkIsDuringTge,
  ]);

  const afterTGEPeriod = useMemo(() => {
    return checkIsAfterTgePeriod(
      offer.marketplace.tge,
      Number(offer.marketplace.settlement_period),
    );
  }, [
    offer.marketplace.tge,
    offer.marketplace.settlement_period,
    checkIsAfterTgePeriod,
  ]);

  const isCanSettle = useMemo(() => {
    if (!afterTGE) return false;
    if (isLoadingMakerDetail) return false;

    const offerSettleType = makerDetail?.offer_settle_type;
    const isTurbo = offerSettleType === "turbo";

    if (isTurbo && offer.pre_offer_display) {
      return false;
    }

    return (
      !["canceled", "settled"].includes(offer.offer_status) ||
      (offer.offer_status === "canceled" && Number(offer.used_points) > 0)
    );
  }, [
    offer.offer_status,
    afterTGE,
    offer.used_points,
    makerDetail,
    isLoadingMakerDetail,
    offer.pre_offer_display,
  ]);

  const isSettled = useMemo(() => {
    return ["settled", "finished"].includes(offer.offer_status);
  }, [offer.offer_status]);

  const isCanceled = offer.offer_status === "canceled";

  const isClosed = useMemo(() => {
    return ["filled", "canceled", "settled"].includes(offer.offer_status);
  }, [offer.offer_status]);

  const isCanAbort = useMemo(() => {
    if (!makerDetail) return false;
    if (offer.offer_type === "bid") return false;

    if (["unknown", "settled"].includes(offer.offer_status)) return false;

    const offerSettleType = makerDetail?.offer_settle_type;
    const isProtected = offerSettleType === "protected";
    const isTurbo = offerSettleType === "turbo";

    if (isProtected) {
      return ["initialize_v2"].includes(offer.abort_offer_status);
    }

    if (isTurbo) {
      return !!offer.pre_offer_display;
    }

    return false;
  }, [offer, makerDetail]);

  return {
    orderDuration,
    afterTGE,
    afterTGEPeriod,
    duringTGE,

    amount,
    progress,
    offerValue,
    forValue,
    offerLogo,
    forLogo,
    makerDetail,

    tokenPrice,
    isNativeToken,
    tokenTotalPrice,
    pointPerPrice,
    orderPointInfo,
    orderTokenInfo,
    orderEqTokenInfo,

    isCanSettle,
    isSettled,
    isFilled,
    isCanceled,
    isClosed,
    isCanAbort,
  };
}
