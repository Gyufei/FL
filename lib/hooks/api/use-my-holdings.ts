import useSWR from "swr";
import { dataApiFetcher } from "@/lib/fetcher";
import { DataApiPaths } from "@/lib/PathMap";
import { useEndPoint } from "./use-endpoint";
import { IHolding } from "@/lib/types/holding";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { useMarketOffers } from "./use-market-offers";

export function useMyHoldings(chain?: string) {
  const { address } = useChainWallet();
  const { dataApiEndPoint } = useEndPoint();

  const { data: offers, isLoading } = useMarketOffers({
    marketSymbol: "",
    marketChain: chain || "",
  });

  // const tempAddress = 'D7jbXQgpQVr4J4xWtzDPKAgqLrrRWZ2NKrBmiGwyAceN';
  const holdingFetch = async () => {
    if (!address || isLoading) return [];

    const holdingRes = await dataApiFetcher(
      `${dataApiEndPoint}${DataApiPaths.holding}?wallet=${address}&chain=${chain}`,
    );

    const holdings = holdingRes.map((h: any) => {
      const matchingOffer = offers?.find(
        (offer: any) => offer.entry.id === h.entries[0].id,
      );

      return {
        ...h,
        offer: matchingOffer,
      };
    });

    return holdings as Array<IHolding>;
  };

  const res = useSWR(`my_stock:${address}${isLoading}`, holdingFetch);

  return res;
}
