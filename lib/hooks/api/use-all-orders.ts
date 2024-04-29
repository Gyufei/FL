import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Paths } from "@/lib/PathMap";

import { useEndPoint } from "./use-endpoint";
import { IOrder } from "@/lib/types/order";
import { useMarketplaces } from "./use-marketplaces";
import { useOrderResFormat } from "../order/use-order-res-format";

export function useAllOrders() {
  const { apiEndPoint } = useEndPoint();

  const { data: marketplaceData } = useMarketplaces();

  const { orderResFieldFormat, orderResPreDetailFormat } = useOrderResFormat();

  const AllOrdersFetcher = async () => {
    const allOrders: Array<IOrder> = [];

    if (!marketplaceData) return [];

    for (const marketplace of marketplaceData) {
      const orderRes = await fetcher(
        `${apiEndPoint}${Paths.order}?project=${marketplace.market_id}`,
      );

      let parsedRes  = orderRes.map(
        (o: Record<string, any>) => {
          o.market_id = marketplace.market_id;
          return orderResFieldFormat(o);
        }
      )
      parsedRes = parsedRes.map((o: Record<string, any>) => orderResPreDetailFormat(o, parsedRes));
      allOrders.push(...parsedRes);
    }

    return allOrders as Array<IOrder>;
  };

  const res = useSWR(
    () => marketplaceData?.map((m) => m.market_id),
    AllOrdersFetcher,
  );

  return {
    ...res,
  };
}
