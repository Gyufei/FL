import { SolanaZeroed } from "@/lib/constant";
import { useMarketplaces } from "../api/use-marketplaces";
import fetcher from "@/lib/fetcher";
import { Paths } from "@/lib/PathMap";
import { useEndPoint } from "../api/use-endpoint";

const MarketOffersMap: Record<string, any> = {}

export function useOfferResFormat() {
  const { apiEndPoint } = useEndPoint();
  const { data: marketplaceData, isLoading } = useMarketplaces();

  const getOriginOffer = (offs: any[], off: Record<string, any>): Record<string, any> => {
    if (off.pre_offer_account !== SolanaZeroed) {
      const target = offs.find(
          (o: Record<string, any>) => o.offer_account === off.pre_offer_account,
      ) || null;

      return getOriginOffer(offs, target);
    } else {
      return off;
    }
  }

  async function offerResFieldFormat(offer: Record<string, any>, preOffers?: any[]) {
    const marketplace = marketplaceData?.find((m) => m.market_place_id === offer.market_place_account);

    const isPreOfferZeroed = offer.pre_offer_account === SolanaZeroed;

    let offers = null;
    let preOfferDetail = null;
    let originOfferDetail = null;
    if (!isPreOfferZeroed) {
      offers = preOffers || MarketOffersMap[offer.market_place_account] || await fetcher(`${apiEndPoint}${Paths.offer}?market_place_account=${offer.market_place_account}`);
      MarketOffersMap[offer.market_place_account] = offers;

      preOfferDetail = offers.find(
          (o: Record<string, any>) => o.offer_account === offer.pre_offer_account,
      ) || null;

      if (preOfferDetail.pre_offer_account !== SolanaZeroed) {
        originOfferDetail = getOriginOffer(offers, preOfferDetail);
      } else {
        originOfferDetail = offer
      }
    }

    return {
      ...offer,
      marketplace,
      pre_offer: isPreOfferZeroed ? "" : offer.pre_offer_account,
      pre_offer_detail: preOfferDetail,
      origin_offer_detail: originOfferDetail
    };
  }


  return {
    offerResFieldFormat,
    isLoading
  }
}