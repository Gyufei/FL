// import { SolanaZeroed } from "@/lib/constant";
import { useMarketplaces } from "../api/use-marketplaces";

export function useOrderResFormat() {
  const { data: marketplaceData } = useMarketplaces();

  function orderResFieldFormat(order: Record<string, any>) {
    const marketplace = marketplaceData?.find((m) => m.market_place_id === order.market_place_account);

    return {
      ...order,
      marketplace,
    };
  }

  return {
    orderResFieldFormat,
  }
}