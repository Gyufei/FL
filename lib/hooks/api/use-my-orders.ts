import { useState } from "react";
import { IOffer } from "@/lib/types/offer";
import { IOrder } from "@/lib/types/order";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Paths } from "@/lib/PathMap";
import { useEndPoint } from "./use-endpoint";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { getMarketOffer } from "@/lib/helper/market-offer-cache";

export function useMyOrders() {
  const { address } = useChainWallet();
  const { apiEndPoint } = useEndPoint();
  const [isLoading, setIsLoading] = useState(false);

  const myOrdersFetcher = async () => {
    if (!address) return [];
    setIsLoading(true);
    const orderRes = await fetcher(
      `${apiEndPoint}${
        Paths.orders
      }?market_symbol=${""}&wallet=${address}&chain=${"bnb"}`,
    );

    const marketOffer = await getMarketOffer(apiEndPoint, "", "bnb");
    const parsedRes = (orderRes || []).map((order: IOrder) => {
      const matchingOffer = marketOffer?.find(
        (offer: IOffer) => offer.entry.id === order.entry.id,
      );
      return {
        ...order,
        offer: matchingOffer || null,
      };
    });
    setIsLoading(false);
    return parsedRes as Array<IOffer>;
  };

  const res = useSWR(`my_order:${address}${isLoading}`, myOrdersFetcher);

  return {
    ...res,
  };
}
