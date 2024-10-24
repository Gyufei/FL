import { useEffect, useMemo, useState } from "react";
import NP from "number-precision";
import { useStableToken } from "@/lib/hooks/api/token/use-stable-token";
import { useMarketPoints } from "@/lib/hooks/api/use-market-points";
import { IMarketplace } from "@/lib/types/marketplace";
import { IPoint, IToken } from "@/lib/types/token";
import { useTokenPrice } from "@/lib/hooks/api/token/use-token-price";
import { useCreateOffer } from "@/lib/hooks/contract/use-create-offer";
import { ISettleMode } from "@/lib/types/offer";
import { useCreateOfferMinPrice } from "@/lib/hooks/offer/use-create-offer-min-price";

export function useCreateAction(
  marketplace: IMarketplace,
  direction: "buy" | "sell",
) {
  const { data: points } = useMarketPoints();
  const { data: stableTokens } = useStableToken(marketplace.chain);
  const { checkMinPrice } = useCreateOfferMinPrice();

  const [token, setToken] = useState<IToken>({
    symbol: "",
    logoURI: "/icons/empty.svg",
    decimals: 9,
  } as IToken);
  const [tokenAmount, setTokenAmount] = useState("0");
  const [point, setPoint] = useState<IPoint | null>(null);
  const [pointAmount, setPointAmount] = useState("");

  const currentMarket = useMemo(() => {
    if (point?.marketplace) {
      return point.marketplace;
    } else {
      return marketplace;
    }
  }, [marketplace, point]);

  useEffect(() => {
    if (points) {
      setPoint(
        points.find(
          (point) =>
            point.marketplace.market_place_id === marketplace.market_place_id,
        ) || null,
      );
    }
  }, [points, marketplace]);

  useEffect(() => {
    if (stableTokens && stableTokens.length > 0) {
      setToken(stableTokens[0]);
    }
  }, [stableTokens]);

  const { data: tokenPrice } = useTokenPrice(token?.address || "");

  const tokenAmountValue = useMemo(() => {
    if (!tokenAmount) return 0;

    return NP.times(tokenAmount, tokenPrice);
  }, [tokenAmount, tokenPrice]);

  const pointPrice = useMemo(() => {
    if (!pointAmount) {
      return 0;
    }

    return NP.divide(tokenAmountValue, pointAmount);
  }, [tokenAmountValue, pointAmount]);

  const {
    isLoading: isCreating,
    write: writeAction,
    isSuccess: isCreateSuccess,
  } = useCreateOffer(currentMarket.market_symbol, currentMarket.chain);

  async function handleCreate({
    collateralRate,
    settleMode,
    taxForSub,
  }: {
    collateralRate: string;
    settleMode: ISettleMode;
    taxForSub: string;
  }) {
    const isPriceValid = checkMinPrice(
      pointPrice,
      Number(currentMarket.minimum_price),
    );

    if (!pointAmount || !tokenAmount || !isPriceValid) {
      return;
    }

    writeAction({
      direction: direction,
      price: String(pointPrice),
      total_item_amount: pointAmount,
      payment_token: token.symbol,
      collateral_ratio: collateralRate,
      settle_mode: settleMode,
      trade_tax_pct: taxForSub,
    });
  }

  return {
    token,
    setToken,
    point,
    setPoint,

    points,
    currentMarket,
    tokenAmount,
    setTokenAmount,
    pointAmount,
    setPointAmount,
    tokenAmountValue,
    pointPrice,

    isCreating,
    handleCreate,
    isCreateSuccess,
  };
}
