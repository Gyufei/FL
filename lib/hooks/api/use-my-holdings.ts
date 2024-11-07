import useSWR from "swr";
import { dataApiFetcher } from "@/lib/fetcher";
import { DataApiPaths } from "@/lib/PathMap";
import { useEndPoint } from "./use-endpoint";
import { IHolding } from "@/lib/types/holding";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { useMarketOffers } from "./use-market-offers";
import { useMarketplaces } from "./use-marketplaces";
import { useMemo } from "react";
import NP from "number-precision";
import { ChainType } from "@/lib/types/chain";

export function useMyHoldings({ chain }: { chain?: ChainType }) {
  const { address } = useChainWallet(chain);
  const { dataApiEndPoint } = useEndPoint();
  const { data: marketplaceData } = useMarketplaces();
  const { data: offers, isLoading: isOfferLoading } = useMarketOffers({
    marketSymbol: null,
    marketChain: chain || "",
  });

  const itemTypeObject = useMemo(() => {
    const categorized: any = {};
    if (!marketplaceData) return {};

    marketplaceData.forEach((item) => {
      const { market_catagory, market_symbol } = item;
      if (!categorized[market_catagory]) {
        categorized[market_catagory] = [];
      }
      categorized[market_catagory].push(market_symbol);
    });

    return categorized;
  }, [marketplaceData]);

  const holdingFetch = async () => {
    if (!address || isOfferLoading) return [];

    const holdingRes = await dataApiFetcher(
      `${dataApiEndPoint}${DataApiPaths.holding}?wallet=${address}&chain=${chain}`,
    );

    if (holdingRes?.length <= 0) return [];

    const offchain_fungible_point_holding = (
      itemTypeObject?.offchain_fungible_point || []
    ).map((item: any) => {
      const curHolding = holdingRes.find((h: any) => item === h.market_symbol);
      const curMarketplace = marketplaceData?.find(
        (m: any) => "offchain_fungible_point" === m.market_catagory,
      );
      return {
        ...curHolding,
        marketplace: curMarketplace,
      };
    });

    const point_token_holding = (itemTypeObject?.point_token_holding || []).map(
      (item: any) => {
        const curHolding = holdingRes.find(
          (h: any) => item === h.market_symbol,
        );
        const curMarketplace = marketplaceData?.find(
          (m: any) => "point_token_holding" === m.market_catagory,
        );
        return {
          ...curHolding,
          allItemAmount: holdingRes
            .filter((h: any) => item === h.market_symbol)
            .reduce(
              (acc: number, cur: IHolding) =>
                NP.plus(
                  acc +
                    cur.entries.reduce(
                      (ac, cu) => NP.plus(ac + cu.item_amount),
                      0,
                    ),
                ),
              0,
            ),
          marketplace: curMarketplace,
        };
      },
    );

    const holdings = holdingRes.filter(
      (h: any) =>
        ![
          ...(itemTypeObject?.offchain_fungible_point || []),
          ...(itemTypeObject?.point_token || []),
        ].includes(h.market_symbol),
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
      ...offchain_fungible_point_holding,
      ...point_token_holding,
      ...holdingsHasOffer,
    ].filter((i) => i.market_symbol) as Array<IHolding>;
  };

  const res = useSWR(
    `my_stock:${chain}${address}${isOfferLoading}`,
    holdingFetch,
  );

  return res;
}
