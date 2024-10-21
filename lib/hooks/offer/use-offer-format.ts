import NP from "number-precision";
import { IOffer } from "../../types/offer";
import { useMemo } from "react";
import { IPoint, IToken } from "../../types/token";
import { formatTimeDuration } from "../../utils/time";
import useTge from "../marketplace/useTge";
import { useTokenPrice } from "@/lib/hooks/api/token/use-token-price";
import { useTokens } from "../api/token/use-tokens";

export function useOfferFormat({ offer }: { offer: IOffer }) {
  const { data: tokens } = useTokens();

  const { checkIsAfterTge, checkIsDuringTge, checkIsAfterTgePeriod } = useTge();

  const offerTokenInfo = useMemo(() => {
    return tokens?.find((t) => t.symbol === offer.payment_token);
  }, [offer, tokens]);

  const { data: tokenPrice } = useTokenPrice(offerTokenInfo?.address || "");

  const offerPointInfo: IPoint = {
    symbol: offer.marketplace.item_name,
    logoURI: offer.marketplace.pointLogo,
    marketplace: offer.marketplace,
  };

  const offerEqTokenInfo = {
    symbol: "TBA",
    logoURI: offer.marketplace.pointLogo,
    decimals: 9,
  } as IToken;

  const tokenLogo = offerTokenInfo?.logoURI || "/icons/empty.svg";
  const pointLogo = offerPointInfo?.logoURI || "/icons/empty.svg";

  const amount = NP.times(offer.item_amount, offer.price);

  const progress = Number(
    (Number(offer.taken_item_amount) / Number(offer.item_amount)).toFixed(2),
  );

  const offerType = offer.entry.direction;
  const offerValue = offerType === "sell" ? offer.item_amount : amount;
  const forValue = offerType === "sell" ? amount : offer.item_amount;
  const offerLogo = offerType === "sell" ? pointLogo : tokenLogo;
  const forLogo = offerType === "sell" ? tokenLogo : pointLogo;

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

    const offerSettleType = offer?.origin_settle_mode;
    const isTurbo = offerSettleType === "turbo";

    if (isTurbo && !offer.entry.is_root) {
      return false;
    }

    return (
      !["canceled", "settled"].includes(offer.status) ||
      (offer.status === "canceled" && Number(offer.taken_item_amount) > 0)
    );
  }, [offer, afterTGE]);

  const isSettled = useMemo(() => {
    return ["settled", "finished"].includes(offer.status);
  }, [offer.status]);

  const isCanceled = offer.status === "canceled";

  const isClosed = useMemo(() => {
    return ["filled", "canceled", "settled"].includes(offer.status);
  }, [offer.status]);

  const isCanAbort = useMemo(() => {
    if (offer.entry.direction === "buy") return false;

    if (["unknown", "settled"].includes(offer.status)) return false;

    const offerSettleType = offer.origin_settle_mode;
    const isProtected = offerSettleType === "protected";
    const isTurbo = offerSettleType === "turbo";

    if (isProtected) {
      return ["initialize_v2"].includes(offer.abort_offer_status);
    }

    if (isTurbo) {
      return !offer.entry.is_root;
    }

    return false;
  }, [offer]);

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

    tokenPrice,
    tokenTotalPrice,
    pointPerPrice,
    offerPointInfo,
    offerTokenInfo,
    offerEqTokenInfo,

    isCanSettle,
    isSettled,
    isFilled,
    isCanceled,
    isClosed,
    isCanAbort,
  };
}
