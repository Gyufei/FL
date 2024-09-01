import { SolanaZeroed } from "@/lib/const/solana";
import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import fetcher from "@/lib/fetcher";
import { Paths } from "@/lib/PathMap";
import { useEndPoint } from "@/lib/hooks/api/use-endpoint";
import { useCurrentChain } from "../web3/use-current-chain";

const MarketOffersMap: Record<string, any> = {};

export function useOfferResFormat() {
  const { apiEndPoint } = useEndPoint();
  const { data: marketplaceData, isLoading } = useMarketplaces();
  const { isEth } = useCurrentChain();

  const getOriginOffer = (
    offs: any[],
    off: Record<string, any>,
  ): Record<string, any> => {
    if (off && off.pre_offer_account !== SolanaZeroed) {
      const target =
        offs.find(
          (o: Record<string, any>) =>
            o.offer_account === off?.pre_offer_account,
        ) || null;

      return getOriginOffer(offs, target);
    } else {
      return off;
    }
  };

  async function offerResFieldFormat(
    offer: Record<string, any>,
    preOffers?: any[],
  ) {
    try {
      const marketplace = marketplaceData?.find(
        (m) => m.market_place_id === offer.market_place_account,
      );

      const isPreOfferZeroed = isEth
        ? offer?.pre_offer_account === SolanaZeroed
        : false;

      let offers = null;
      let preOfferDetail = null;
      let originOfferDetail = null;
      if (!isPreOfferZeroed) {
        offers =
          preOffers ||
          MarketOffersMap[offer.market_place_account] ||
          (await fetcher(
            `${apiEndPoint}${Paths.offer}?market_place_account=${offer.market_place_account}`,
          ));
        MarketOffersMap[offer.market_place_account] = offers;

        preOfferDetail =
          offers.find(
            (o: Record<string, any>) =>
              o.offer_account === offer?.pre_offer_account,
          ) || null;

        originOfferDetail = getOriginOffer(offers, preOfferDetail);
      } else {
        preOfferDetail = offer;
        originOfferDetail = offer;
      }

      return {
        ...offer,
        marketplace,
        pre_offer: isPreOfferZeroed ? "" : offer?.pre_offer_account,
        pre_offer_detail: preOfferDetail,
        origin_offer_detail: originOfferDetail,
      };
    } catch (e) {
      console.log("123", e);
      return null;
    }
  }

  return {
    offerResFieldFormat,
    isLoading,
  };
}
