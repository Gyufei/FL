import { SolanaZeroed } from "@/lib/constant";
import { useMarketplaces } from "../api/use-marketplaces";
import fetcher from "@/lib/fetcher";
import { Paths } from "@/lib/PathMap";
import { useEndPoint } from "../api/use-endpoint";
import { useOfferResFormat } from "../offer/use-offer-res-format";

const MarketOffersMap: Record<string, any> = {}

export function useStockResFormat() {
  const { apiEndPoint } = useEndPoint();
  const { data: marketplaceData, isLoading: isMarketLoading } = useMarketplaces();


  const { offerResFieldFormat: orderResFieldFormat, isLoading: isOffersLoading } = useOfferResFormat();

  async function stockResFieldFormat(stock: Record<string, any>) {
    const marketplace = marketplaceData?.find((m) => m.market_place_id === stock.market_place_account);

    const isPreOfferZeroed = stock.pre_offer_account === SolanaZeroed;
    const isOfferZeroed = stock.offer_account === SolanaZeroed;

    let offers = null;
    if (!isPreOfferZeroed || !isOfferZeroed) {
      if (MarketOffersMap[stock.market_place_account]) {
        offers = MarketOffersMap[stock.market_place_account]
      } else {
        const rawOffers = await fetcher(`${apiEndPoint}${Paths.offer}?market_place_account=${stock.market_place_account}`);
        offers = await Promise.all(rawOffers.map((o: Record<string, any>) => orderResFieldFormat(o, rawOffers)));
      }

      offers = offers!.map((o: any) => {
        return {
          ...o,
          marketplace
        }
      })

      MarketOffersMap[stock.market_place_account] = offers;
    }

    let preOfferDetail = null;
    if (!isPreOfferZeroed) {
      preOfferDetail = offers.find(
          (o: Record<string, any>) => o.offer_account === stock.pre_offer,
      ) || null;
    }

    let offerDetail = null;

    if (!isOfferZeroed) {
      offerDetail = offers.find(
          (o: Record<string, any>) => o.offer_account === stock.offer,
      ) || null;
    }

    return {
      ...stock,
      marketplace,
      pre_offer: isPreOfferZeroed ? "" : stock.pre_offer_account,
      pre_offer_detail: preOfferDetail,
      offer: isOfferZeroed ? "" : stock.offer_account,
      offer_detail: offerDetail
    };
  }


  return {
    stockResFieldFormat,
    isLoading: isMarketLoading || isOffersLoading
  }
}