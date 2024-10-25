import useSWR from "swr";
import { dataApiFetcher } from "@/lib/fetcher";
import {
  DataApiPaths,
  WithPointImgCDN,
  WithProjectImgCDN,
} from "@/lib/PathMap";

import { useEndPoint } from "./use-endpoint";
import { IMarketplace } from "@/lib/types/marketplace";
import { ChainType } from "@/lib/types/chain";

export function useMarketplaces(chain?: string) {
  const { dataApiEndPoint } = useEndPoint();

  async function fetchChainMarket() {
    const query = chain ? `?chain=${chain}` : "";
    const mars = await dataApiFetcher(
      `${dataApiEndPoint}${DataApiPaths.markets}${query}`,
    );

    return mars;
  }

  async function allChainFetch() {
    const chains = [ChainType.ETH, ChainType.BNB, ChainType.SOLANA];

    const res = await Promise.all(
      chains.map(async (chain: ChainType) => {
        const mars = await fetchChainMarket();
        const markets = mars.map((m: any) => {
          return {
            ...m,
            projectLogo: WithProjectImgCDN(m.market_symbol, chain),
            pointLogo: WithPointImgCDN(m.market_symbol, chain),
            chain,
          };
        });

        return markets;
      }),
    );

    const allMarket = res.flat();

    return allMarket as Array<IMarketplace>;
  }

  const res = useSWR(`marketplaces-${chain || "all"}`, allChainFetch);

  return res;
}
