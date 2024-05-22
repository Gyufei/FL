// import { SolanaZeroed } from "@/lib/constant";
import { SolanaZeroed } from "@/lib/constant";
import { useMarketplaces } from "../api/use-marketplaces";
import fetcher from "@/lib/fetcher";
import { Paths } from "@/lib/PathMap";
import { useEndPoint } from "../api/use-endpoint";

export function useOfferResFormat() {
  const { apiEndPoint } = useEndPoint();
  const { data: marketplaceData, isLoading } = useMarketplaces();

  const MarketOffersMap: Record<string, any> = {}

  async function offerResFieldFormat(offerOrStock: Record<string, any>, preOffers?: any[]) {
    const marketplace = marketplaceData?.find((m) => m.market_place_id === offerOrStock.market_place_account);

    const isZeroed = offerOrStock.pre_offer_account === SolanaZeroed;

    let offers = null;
    let preOfferDetail = null;
    if (!isZeroed) {
      offers = preOffers || MarketOffersMap[offerOrStock.market_place_account] || await fetcher(`${apiEndPoint}${Paths.offer}?market_place_account=${offerOrStock.market_place_account}`);
      MarketOffersMap[offerOrStock.market_place_account] = offers;

      preOfferDetail = offers.find(
          (o: Record<string, any>) => o.order === offerOrStock.pre_offer,
      ) || null;
    }

    return {
      ...offerOrStock,
      marketplace,
      pre_offer: isZeroed ? "" : offerOrStock.pre_offer_account,
      pre_offer_detail: preOfferDetail,
    };
  }


  return {
    offerResFieldFormat,
    isLoading
  }
}