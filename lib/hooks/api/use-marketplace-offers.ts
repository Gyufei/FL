import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { Paths } from "@/lib/PathMap";
import { useOrderResFormat } from "../offer/use-order-res-format";
import fetcher from "@/lib/fetcher";
import { IOffer } from "@/lib/types/order";

export function useMarketplaceOffers({
  marketAccount,
}: {
  marketAccount: string;
}) {
  const { apiEndPoint } = useEndPoint();
  const { orderResFieldFormat } = useOrderResFormat();

  const marketOrdersFetcher = async () => {
      if (!marketAccount) return [];

      const orderRes = await fetcher(
        `${apiEndPoint}${Paths.offer}?market_place_account=${marketAccount}`,
      );

      const parsedRes = orderRes.map((o: Record<string, any>) => orderResFieldFormat(o));

      return parsedRes as Array<IOffer>;
  };

  const res = useSWR(
    `market-order:${marketAccount}`,
    marketOrdersFetcher,
  );

  return {
    ...res,
  };
}
