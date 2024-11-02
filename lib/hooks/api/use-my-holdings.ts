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
    marketSymbol: null,
    marketChain: chain || "",
  });

  // const tempAddress = 'D7jbXQgpQVr4J4xWtzDPKAgqLrrRWZ2NKrBmiGwyAceN';
  const holdingFetch = async () => {
    if (!address || isLoading || !(offers && offers?.length > 0)) return [];

    const holdingRes = await dataApiFetcher(
      `${dataApiEndPoint}${DataApiPaths.holding}?wallet=${address}&chain=${chain}`,
    );

    const holdings = holdingRes.filter(
      (h: any) => !["card3", "spherex", "din"].includes(h.market_symbol),
    );
    const offchain_fungible_point_holding = holdingRes.find((h: any) =>
      ["card3", "spherex"].includes(h.market_symbol),
    );
    const point_token_holding = holdingRes.find((h: any) =>
      ["din"].includes(h.market_symbol),
    );
    const holdingsHasOffer = holdings.map((h: any) => {
      const matchingOffer = offers?.find(
        (offer: any) => offer.entry.id === h.entries[0].id,
      );

      return {
        ...h,
        offer: matchingOffer,
      };
    });

    return [
      offchain_fungible_point_holding,
      point_token_holding,
      ...holdingsHasOffer,
    ].filter((i) => i) as Array<IHolding>;
  };

  const res = useSWR(`my_stock:${address}${isLoading}`, holdingFetch);

  return res;
}
