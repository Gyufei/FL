import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";

export function useOfferResFormat() {
  const { data: marketplaceData, isLoading } = useMarketplaces();

  async function offerResFieldFormat(offer: Record<string, any>) {
    try {
      const marketplace = marketplaceData?.find(
        (m) => m.market_symbol === offer.entry.market_symbol,
      );

      return {
        ...offer,
        marketplace,
      };
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  return {
    offerResFieldFormat,
    isLoading,
  };
}
