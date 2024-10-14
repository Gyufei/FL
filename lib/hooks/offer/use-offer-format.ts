import NP from "number-precision";
import { IOffer } from "../../types/offer";
import { useMemo } from "react";
import { IPoint, IToken } from "../../types/token";
import { formatTimeDuration } from "../../utils/time";
import useTge from "../marketplace/useTge";
import { useMakerDetail } from "@/lib/hooks/api/use-maker-detail";
import { useTokensInfo } from "@/lib/hooks/api/token/use-token-info";
import { useTokenPrice } from "@/lib/hooks/api/token/use-token-price";
import { useIsNativeToken } from "../api/token/use-is-native-token";

export function useOfferFormat({ offer }: { offer: IOffer }) {
  const { data: makerDetail, isLoading: isLoadingMakerDetail } = useMakerDetail(
    {
      makerId: offer.offer_maker,
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

  const amount = NP.times(offer.item_amount, offer.price);

  const progress = Number(
    (Number(offer.taken_item_amount) / Number(offer.item_amount)).toFixed(2),
  );

  const offerType = offer.entry.direction;
  const offerValue = offerType === "sell" ? offer.item_amount : amount;
  const forValue = offerType === "buy" ? amount : offer.item_amount;
  const offerLogo = offerType === "sell" ? pointLogo : tokenLogo;
  const forLogo = offerType === "buy" ? tokenLogo : pointLogo;

  const tokenTotalPrice = NP.times(amount, tokenPrice);
  const pointPerPrice = NP.divide(tokenTotalPrice, offer.item_amount);

  const orderDuration = formatTimeDuration(
    Math.floor(NP.minus(Date.now() / 1000, offer.create_at)),
  );

  const isFilled = offer.taken_item_amount === offer.item_amount;

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
      !["canceled", "settled"].includes(offer.status) ||
      (offer.status === "canceled" && Number(offer.taken_item_amount) > 0)
    );
  }, [
    offer.status,
    afterTGE,
    offer.taken_item_amount,
    makerDetail,
    isLoadingMakerDetail,
    offer.pre_offer_display,
  ]);

  const isSettled = useMemo(() => {
    return ["settled", "finished"].includes(offer.status);
  }, [offer.status]);

  const isCanceled = offer.status === "canceled";

  const isClosed = useMemo(() => {
    return ["filled", "canceled", "settled"].includes(offer.status);
  }, [offer.status]);

  const isCanAbort = useMemo(() => {
    if (!makerDetail) return false;
    if (offer.entry.direction === "buy") return false;

    if (["unknown", "settled"].includes(offer.status)) return false;

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
