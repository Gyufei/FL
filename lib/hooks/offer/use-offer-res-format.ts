import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import { useCurrentChain } from "../web3/use-current-chain";

export function useOfferResFormat() {
  const { data: marketplaceData, isLoading } = useMarketplaces();
  const { currentChainInfo } = useCurrentChain();

  async function offerResFieldFormat(
    offer: Record<string, any>,
    preOffers: any[],
  ) {
    try {
      console.log(offer);
      const marketplace = marketplaceData?.find(
        (m) => m.market_symbol === offer.entry.market_symbol,
      );

      const offsMap = preOffers.reduce(
        (acc: Record<string, any>, o: Record<string, any>) => {
          acc[o.offer_id] = o;
          return acc;
        },
        {},
      );

      const isPreOfferZeroed =
        offer?.pre_offer_account === currentChainInfo?.zeroAddr;

      let preOfferDetail = null;
      let originOfferDetail = null;
      if (!isPreOfferZeroed) {
        preOfferDetail = offsMap[offer.pre_offer_account] || null;
        originOfferDetail = getOriginOffer(preOfferDetail, offsMap);
      } else {
        preOfferDetail = offer;
        originOfferDetail = offer;
      }

      return {
        ...offer,
        marketplace,
        pre_offer_display: isPreOfferZeroed ? "" : offer?.pre_offer_account,
        pre_offer_detail: preOfferDetail,
        origin_offer_detail: originOfferDetail,
      };
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  const getOriginOffer = (
    off: Record<string, any>,
    offsMap: Record<string, any>,
  ): Record<string, any> => {
    const isPreZero = off?.pre_offer_account === currentChainInfo.zeroAddr;

    if (off && !isPreZero) {
      const target = offsMap[off.pre_offer_account] || null;

      return getOriginOffer(target, offsMap);
    } else {
      return off;
    }
  };

  return {
    offerResFieldFormat,
    isLoading,
  };
}
