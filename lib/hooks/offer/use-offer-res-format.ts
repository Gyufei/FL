// import { SolanaZeroed } from "@/lib/constant";
import { SolanaZeroed } from "@/lib/constant";
import { useMarketplaces } from "../api/use-marketplaces";

export function useOfferResFormat() {
  const { data: marketplaceData, isLoading } = useMarketplaces();

  function orderResFieldFormat(offer: Record<string, any>, offers: Array<Record<string, any>>) {
    const marketplace = marketplaceData?.find((m) => m.market_place_id === offer.market_place_account);

    const isZeroed = offer.pre_offer_account === SolanaZeroed;
    const preOfferDetail = isZeroed
      ? null
      : offers.find(
          (o: Record<string, any>) => o.order === offer.pre_offer,
        ) || null;


    return {
      ...offer,
      marketplace,
      pre_offer: isZeroed ? "" : offer.pre_offer_account,
      pre_offer_detail: preOfferDetail,
    };
  }


  return {
    orderResFieldFormat,
    isLoading
  }
}