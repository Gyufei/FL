import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Paths } from "@/lib/PathMap";

import { useEndPoint } from "./use-endpoint";
import { IOrder } from "@/lib/types/order";
import { useMarketplaces } from "./use-marketplaces";

export function useOrders({ marketplaceId }: { marketplaceId: string }) {
  const { apiEndPoint } = useEndPoint();

  const { data: marketplaceData } = useMarketplaces();

  const orderMarketPlace = marketplaceData?.find(
    (m) => m.market_place_id === marketplaceId,
  );

  const OrdersFetcher = async () => {
    if (!marketplaceId) return [];

    const res = await fetcher(
      `${apiEndPoint}${Paths.order}?market_place_id=${marketplaceId}`,
      {},
      true,
    );

    let parsedRes = res.map((order: Record<string, any>) => {
      return {
        ...order,
        marketplace: orderMarketPlace,
      };
    });

    parsedRes = parsedRes.map((order: Record<string, any>) => {
      const preOrderDetail =
        parsedRes.find(
          (o: Record<string, any>) => o.order === order.pre_order,
        ) || null;

      return {
        ...order,
        preOrderDetail,
      };
    });

    return parsedRes as Array<IOrder>;
  };

  const res = useSWR(`orders?marketplaceId=${marketplaceId}`, OrdersFetcher);

  return res;
}
