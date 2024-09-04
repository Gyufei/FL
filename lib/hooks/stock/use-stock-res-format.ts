import { SolanaZeroed } from "@/lib/const/solana";
import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import { useEndPoint } from "@/lib/hooks/api/use-endpoint";
import { useOfferResFormat } from "../offer/use-offer-res-format";
import { getMarketOffer } from "@/lib/helper/market-offer-cache";

export function useStockResFormat() {
  const { apiEndPoint } = useEndPoint();
  const { data: marketplaceData, isLoading: isMarketLoading } =
    useMarketplaces();

  const { offerResFieldFormat, isLoading: isOffersLoading } =
    useOfferResFormat();

  async function stockResFieldFormat(holding: Record<string, any>) {
    const marketplace = marketplaceData?.find(
      (m) => m.market_place_id === holding.market_place_account,
    );

    const isPreOfferZeroed = holding.pre_offer_account === SolanaZeroed;
    const isOfferZeroed = holding.offer_account === SolanaZeroed;

    let offers = null;
    if (!isPreOfferZeroed || !isOfferZeroed) {
      const rawOffers = await getMarketOffer(
        apiEndPoint,
        holding.market_place_account,
      );

      offers = await Promise.all(
        rawOffers.map((o: Record<string, any>) =>
          offerResFieldFormat(o, rawOffers),
        ),
      );

      offers = offers!.map((o: any) => {
        return {
          ...o,
          marketplace,
        };
      });
    }

    let preOfferDetail = null;
    if (!isPreOfferZeroed) {
      preOfferDetail =
        offers!.find(
          (o: Record<string, any>) =>
            o.offer_account === holding.pre_offer_account,
        ) || null;
    }

    let offerDetail = null;

    if (!isOfferZeroed) {
      offerDetail =
        offers!.find(
          (o: Record<string, any>) => o.offer_account === holding.offer,
        ) || null;
    }

    return {
      ...holding,
      marketplace,
      pre_offer_display: isPreOfferZeroed ? "" : holding.pre_offer_account,
      pre_offer_detail: preOfferDetail,
      offer: isOfferZeroed ? "" : holding.offer_account,
      offer_detail: offerDetail,
    };
  }

  return {
    stockResFieldFormat,
    isLoading: isMarketLoading || isOffersLoading,
  };
}
