import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { IOffer } from "@/lib/types/offer";
import { Paths } from "@/lib/PathMap";
import fetcher from "@/lib/fetcher";
import { useMarketplaces } from "./use-marketplaces";

export function useMarketOffers({
  marketSymbol,
  marketChain,
}: {
  marketSymbol: string;
  marketChain: string;
}) {
  const { apiEndPoint } = useEndPoint();
  const { data: marketplaceData, isLoading: isMarketLoading } =
    useMarketplaces();

  const marketOffersFetcher = async () => {
    if (!marketSymbol || isMarketLoading) return [];

    const offerRes = await fetcher(
      `${apiEndPoint}${Paths.offers}?market_symbol=${marketSymbol}&chain=${marketChain}`,
    );

    const parsedRes = await Promise.all(
      offerRes.map((o: Record<string, any>) => {
        const marketplace = marketplaceData?.find(
          (m) => m.market_symbol === o.entry.market_symbol,
        );

        return {
          ...o,
          marketplace,
        };
      }),
    );

    return parsedRes as Array<IOffer>;
  };

  const res = useSWR(
    `market-offer:${apiEndPoint}-${marketSymbol}-${isMarketLoading}`,
    marketOffersFetcher,
  );

  return {
    ...res,
  };
}
