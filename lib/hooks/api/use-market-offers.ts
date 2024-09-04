import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { useOfferResFormat } from "../offer/use-offer-res-format";
import { IOffer } from "@/lib/types/offer";
import { getMarketOffer } from "@/lib/helper/market-offer-cache";

export function useMarketOffers({ marketAccount }: { marketAccount: string }) {
  const { apiEndPoint } = useEndPoint();
  const { offerResFieldFormat, isLoading } = useOfferResFormat();

  const marketOffersFetcher = async () => {
    if (!marketAccount || isLoading) return [];

    const offerRes = await getMarketOffer(apiEndPoint, marketAccount);

    const parsedRes = await Promise.all(
      offerRes.map((o: Record<string, any>) =>
        offerResFieldFormat(o, offerRes),
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
