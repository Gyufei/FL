import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { Paths } from "@/lib/PathMap";
import fetcher from "@/lib/fetcher";
import { useStockResFormat } from "../stock/use-stock-res-format";
import { IStock } from "@/lib/types/stock";

export function useMarketStocks({
  marketAccount,
}: {
  marketAccount: string;
}) {
  const { apiEndPoint } = useEndPoint();

  const { stockResFieldFormat, isLoading } = useStockResFormat();

  const marketStocksFetcher = async () => {
      if (!marketAccount || isLoading) return [];

      const orderRes = await fetcher(
        `${apiEndPoint}${Paths.stock}?market_place_account=${marketAccount}`,
      );

    const filedRes = orderRes.map((o: Record<string, any>) => {
      const res = {
        ...o,
        offer_account: o.offer,
        pre_offer_account: o.pre_offer,
      }

      return res;
    });

    const parsedRes = await Promise.all(filedRes.map((o: Record<string, any>) => stockResFieldFormat(o)));

    return parsedRes as Array<IStock>;
  };

  const res = useSWR(
    `market-stock:${marketAccount}`,
    marketStocksFetcher,
  );

  return {
    ...res,
  };
}
