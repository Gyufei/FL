import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Paths } from "@/lib/PathMap";

import { useEndPoint } from "./use-endpoint";
import { IOffer } from "@/lib/types/order";
import { useMarketplaces } from "./use-marketplaces";
import { useOrderResFormat } from "../offer/use-order-res-format";

export function useAllOrders() {
  const { apiEndPoint } = useEndPoint();

  const { data: marketplaceData } = useMarketplaces();

  const { orderResFieldFormat } = useOrderResFormat();

  const AllOrdersFetcher = async () => {
    const allOrders: Array<IOffer> = [];

    if (!marketplaceData) return [];

    for (const marketplace of marketplaceData) {
      const orderRes = await fetcher(
        `${apiEndPoint}${Paths.offer}?project=${marketplace.market_id}`,
      );

      const parsedRes  = orderRes.map(
        (o: Record<string, any>) => {
          o.market_place_account = marketplace.market_id;
          return orderResFieldFormat(o);
        }
      )
      allOrders.push(...parsedRes);
    }

    return allOrders as Array<IOffer>;
  };

  const res = useSWR(
    () => marketplaceData?.map((m) => m.market_id),
    AllOrdersFetcher,
  );

  return {
    ...res,
  };
}
