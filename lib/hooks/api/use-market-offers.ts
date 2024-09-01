import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { Paths } from "@/lib/PathMap";
import { useOfferResFormat } from "../offer/use-offer-res-format";
import fetcher from "@/lib/fetcher";
import { IOffer } from "@/lib/types/offer";

export function useMarketOffers({ marketAccount }: { marketAccount: string }) {
  const { apiEndPoint } = useEndPoint();
  const { offerResFieldFormat: orderResFieldFormat, isLoading } =
    useOfferResFormat();

  const marketOffersFetcher = async () => {
    if (!marketAccount || isLoading) return [];

    const offerRes = await fetcher(
      `${apiEndPoint}${Paths.offer}?market_place_account=${marketAccount}`,
    );
      

    const parsedRes = await Promise.all(
      offerRes.map((o: Record<string, any>) =>
        orderResFieldFormat(o, offerRes),
      ),
    );
    
    return parsedRes as Array<IOffer>;
  };

  const res = useSWR(
    `market-offer:${apiEndPoint}-${marketAccount}-${isLoading}`,
    marketOffersFetcher,
  );

  return {
    ...res,
  };
}
