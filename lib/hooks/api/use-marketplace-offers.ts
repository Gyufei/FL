import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { Paths } from "@/lib/PathMap";
import { useOfferResFormat } from "../offer/use-offer-res-format";
import fetcher from "@/lib/fetcher";
import { IOffer } from "@/lib/types/offer";

export function useMarketplaceOffers({
  marketAccount,
}: {
  marketAccount: string;
}) {
  const { apiEndPoint } = useEndPoint();
  const { offerResFieldFormat: orderResFieldFormat, isLoading } = useOfferResFormat();

  const marketOrdersFetcher = async () => {
      if (!marketAccount || isLoading) return [];

      const orderRes = await fetcher(
        `${apiEndPoint}${Paths.offer}?market_place_account=${marketAccount}`,
      );

      const parsedRes = await Promise.all(orderRes.map((o: Record<string, any>) => orderResFieldFormat(o, orderRes)));

      return parsedRes as Array<IOffer>;
  };

  const res = useSWR(
    `market-order:${marketAccount}${isLoading}`,
    marketOrdersFetcher,
  );

  return {
    ...res,
  };
}
