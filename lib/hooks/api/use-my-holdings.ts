import useSWR from "swr";
import { dataApiFetcher } from "@/lib/fetcher";
import { DataApiPaths } from "@/lib/PathMap";
import { useEndPoint } from "./use-endpoint";
import { IHolding } from "@/lib/types/holding";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { useMarketOffers } from "./use-market-offers";
import { useMarketplaces } from "./use-marketplaces";

export function useMyHoldings({ chain }: { chain?: string }) {
  const { address } = useChainWallet();
  const { dataApiEndPoint } = useEndPoint();
  const { data: marketplaceData } = useMarketplaces();
  const { data: offers, isLoading: isOfferLoading } = useMarketOffers({
    marketSymbol: null,
    marketChain: chain || "",
  });

  // const tempAddress = 'D7jbXQgpQVr4J4xWtzDPKAgqLrrRWZ2NKrBmiGwyAceN';
  const holdingFetch = async () => {
    if (!address || isOfferLoading || !(offers && offers?.length > 0))
      return [];

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
    marketplaceData?.forEach((i) => {
      if (
        offchain_fungible_point_holding &&
        offchain_fungible_point_holding.market_symbol === i.market_symbol
      ) {
        offchain_fungible_point_holding.marketplace = i;
      }
      if (
        point_token_holding &&
        point_token_holding.market_symbol === i.market_symbol
      ) {
        point_token_holding.marketplace = i;
      }
    });

    return [
      offchain_fungible_point_holding,
      point_token_holding,
      ...holdingsHasOffer,
    ].filter((i) => i) as Array<IHolding>;
  };

  const res = useSWR(
    `my_stock:${chain}${address}${isOfferLoading}`,
    holdingFetch,
  );

  return res;
}
