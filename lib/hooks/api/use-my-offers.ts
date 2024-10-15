import { IOffer } from "@/lib/types/offer";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Paths } from "@/lib/PathMap";
import { useEndPoint } from "./use-endpoint";
import { useMarketplaces } from "./use-marketplaces";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";

export function useMyOffers() {
  const { address } = useChainWallet();
  const { apiEndPoint } = useEndPoint();

  const { data: marketplaceData, isLoading: isMarketLoading } =
    useMarketplaces();

  const marketOrdersFetcher = async () => {
    if (!address || isMarketLoading) return [];

    const offerRes = await fetcher(
      `${apiEndPoint}${Paths.myOffer}?authority=${address}`,
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
    `my_offer:${address}${isMarketLoading}`,
    marketOrdersFetcher,
  );

  return {
    ...res,
  };
}
