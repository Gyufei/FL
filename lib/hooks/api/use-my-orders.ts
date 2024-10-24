// import { IOffer } from "@/lib/types/offer";
// import { IOrder } from "@/lib/types/order";
import useSWR from "swr";
import { dataApiFetcher } from "@/lib/fetcher";
import { DataApiPaths } from "@/lib/PathMap";
import { useEndPoint } from "./use-endpoint";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";

import { useMarketOffers } from "@/lib/hooks/api/use-market-offers";
import { IOrder } from "@/lib/types/order";

export function useMyOrders(chain?: string) {
  const { address } = useChainWallet();

  const { dataApiEndPoint } = useEndPoint();
  const { data: offers, isLoading } = useMarketOffers({
    marketSymbol: null,
    marketChain: chain || "",
  });

  const myOrdersFetcher = async () => {
    if (!address || isLoading) return [];
    const orderRes = await dataApiFetcher(
      `${dataApiEndPoint}${DataApiPaths.orders}?wallet=${address}&chain=${
        chain || ""
      }`,
    );

    const parsedRes = (orderRes || []).map((order: any) => {
      const matchingOffer = offers?.find(
        (offer: any) => offer.entry.id === order.entry.id,
      );
      return {
        ...order,
        offer: matchingOffer || null,
      };
    });
    return parsedRes as Array<IOrder>;
  };

  const res = useSWR(`my_order:${address}${isLoading}`, myOrdersFetcher);

  return {
    ...res,
  };
}
