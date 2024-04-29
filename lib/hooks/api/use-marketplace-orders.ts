import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { Paths } from "@/lib/PathMap";
import { useOrderResFormat } from "../order/use-order-res-format";
import fetcher from "@/lib/fetcher";
import { IOrder } from "@/lib/types/order";

export function useMarketplaceOrders({
  marketId: marketId,
}: {
  marketId: string;
}) {
  const { apiEndPoint } = useEndPoint();
  const { orderResFieldFormat, orderResPreDetailFormat } = useOrderResFormat();

  const marketOrdersFetcher = async () => {
      const orderRes = await fetcher(
        `${apiEndPoint}${Paths.order}?project=${marketId}`,
      );

      let parsedRes = orderRes.map((o: Record<string, any>) => {
        o.market_id = marketId;
        return orderResFieldFormat(o);
      });

      parsedRes = parsedRes.map((o: Record<string, any>) => orderResPreDetailFormat(o, parsedRes));

      return parsedRes as Array<IOrder>;
  };

  const res = useSWR(
    `market-order:${marketId}`,
    marketOrdersFetcher,
  );

  return {
    ...res,
  };
}
