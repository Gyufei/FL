import { useMarketOffers } from "@/lib/hooks/api/use-market-offers";
import { ChainType } from "@/lib/types/chain";

export function useOrderResFormat({
  marketSymbol,
  marketChain,
}: {
  marketSymbol: string;
  marketChain: ChainType;
}) {
  const { data: offers, isLoading } = useMarketOffers({
    marketSymbol,
    marketChain,
  });

  async function orderResFieldFormat(order: Record<string, any>) {
    try {
      const marketplace = offers?.find(
        (m) => m.entry.market_symbol === order.entry.market_symbol,
      );

      return {
        ...order,
        marketplace,
      };
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  return {
    orderResFieldFormat,
    isLoading,
  };
}
