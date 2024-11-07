import useSWR from "swr";
import { dataApiFetcher } from "@/lib/fetcher";
import { DataApiPaths } from "@/lib/PathMap";
import { useEndPoint } from "./use-endpoint";
import { IHolding } from "@/lib/types/holding";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { useMarketOffers } from "./use-market-offers";
import { useMarketplaces } from "./use-marketplaces";
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

  const holdingFetch = async () => {
    if (!address || isOfferLoading) return [];

    const holdingRes = await dataApiFetcher(
      `${dataApiEndPoint}${DataApiPaths.holding}?wallet=${address}&chain=${chain}`,
    );

    if (holdingRes?.length <= 0) return [];

    const holdings = holdingRes
      .map((h: any) => {
        const curMarketplace = marketplaceData?.find(
          (m: any) => h.market_symbol === m.market_symbol,
        );

        return {
          ...h,
          marketplace: curMarketplace,
        };
      })
      .map((h: any, _idx: number, arr: Array<any>) => {
        if (h.marketplace?.market_catagory === "point_token") {
          return {
            ...h,
            allItemAmount: arr.reduce(
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
          };
        }

        if (h.marketplace?.market_catagory === "offchain_fungible_point") {
          return {
            ...h,
          };
        }

        if (
          !["point_token", "offchain_fungible_point"].includes(
            h.marketplace?.market_catagory,
          )
        ) {
          const matchingOffer = offers?.find(
            (offer: any) => offer.entry.id === h.entries[0].id,
          );

          return {
            ...h,
            offer: matchingOffer,
          };
        }
      });

    return holdings as Array<IHolding>;
  };

  const res = useSWR(
    `my_stock:${chain}${address}${isOfferLoading}`,
    holdingFetch,
  );

  return res;
}
