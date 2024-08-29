import { SolanaZeroed } from "@/lib/const/solana";
import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import fetcher from "@/lib/fetcher";
import { Paths } from "@/lib/PathMap";
import { useEndPoint } from "@/lib/hooks/api/use-endpoint";
import { useOfferResFormat } from "../offer/use-offer-res-format";

const MarketOffersMap: Record<string, any> = {};

export function useStockResFormat() {
  const { apiEndPoint } = useEndPoint();
  const { data: marketplaceData, isLoading: isMarketLoading } =
    useMarketplaces();

  const {
    offerResFieldFormat: orderResFieldFormat,
    isLoading: isOffersLoading,
  } = useOfferResFormat();

  async function stockResFieldFormat(holding: Record<string, any>) {
    const marketplace = marketplaceData?.find(
      (m) => m.market_place_id === holding.market_place_account,
    );

    const isPreOfferZeroed = holding.pre_offer_account === SolanaZeroed;
    const isOfferZeroed = holding.offer_account === SolanaZeroed;

    let offers = null;
    if (!isPreOfferZeroed || !isOfferZeroed) {
      if (MarketOffersMap[holding.market_place_account]) {
        offers = MarketOffersMap[holding.market_place_account];
      } else {
        const rawOffers = await fetcher(
          `${apiEndPoint}${Paths.offer}?market_place_account=${holding.market_place_account}`,
        );
        offers = await Promise.all(
          rawOffers.map((o: Record<string, any>) =>
            orderResFieldFormat(o, rawOffers),
          ),
        );
      }

      offers = offers!.map((o: any) => {
        return {
          ...o,
          marketplace,
        };
      });

      MarketOffersMap[holding.market_place_account] = offers;
    }

    let preOfferDetail = null;
    if (!isPreOfferZeroed) {
      preOfferDetail =
        offers.find(
          (o: Record<string, any>) => o.offer_account === holding.pre_offer,
        ) || null;
    }

    let offerDetail = null;

    if (!isOfferZeroed) {
      offerDetail =
        offers.find(
          (o: Record<string, any>) => o.offer_account === holding.offer,
        ) || null;
    }

    return {
      ...holding,
      marketplace,
      pre_offer: isPreOfferZeroed ? "" : holding.pre_offer_account,
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
