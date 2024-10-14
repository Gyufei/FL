import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import { useEndPoint } from "@/lib/hooks/api/use-endpoint";
import { useOfferResFormat } from "../offer/use-offer-res-format";
import { getMarketOffer } from "@/lib/helper/market-offer-cache";
import { useCurrentChain } from "../web3/use-current-chain";

export function useHoldingResFormat() {
  const { apiEndPoint } = useEndPoint();
  const { currentChainInfo } = useCurrentChain();

  const { data: marketplaceData, isLoading: isMarketLoading } =
    useMarketplaces();

  const { offerResFieldFormat, isLoading: isOffersLoading } =
    useOfferResFormat();

  async function stockResFieldFormat(holding: Record<string, any>) {
    const marketplace = marketplaceData?.find(
      (m) => m.market_place_id === holding.market_place_account,
    );

    const isPreOfferZeroed =
      holding.pre_offer_account === currentChainInfo.zeroAddr;
    const isOfferZeroed = holding.offer_id === currentChainInfo.zeroAddr;

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
            o.offer_id === holding.pre_offer_account,
        ) || null;
    }

    let offerDetail = null;

    if (!isOfferZeroed) {
      offerDetail =
        offers!.find(
          (o: Record<string, any>) => o.offer_id === holding.offer,
        ) || null;
    }

    return {
      ...holding,
      marketplace,
      pre_offer_display: isPreOfferZeroed ? "" : holding.pre_offer_account,
      pre_offer_detail: preOfferDetail,
      offer: isOfferZeroed ? "" : holding.offer_id,
      offer_detail: offerDetail,
    };
  }

  return {
    stockResFieldFormat,
    isLoading: isMarketLoading || isOffersLoading,
  };
}
