import useSWR from "swr";
import { dataApiFetcher } from "@/lib/fetcher";
import {
  DataApiPaths,
  WithPointImgCDN,
  WithProjectImgCDN,
} from "@/lib/PathMap";

import { useEndPoint } from "./use-endpoint";
import { IMarketplace } from "@/lib/types/marketplace";

export function useMarketplaces(chain?: string) {
  const { dataApiEndPoint } = useEndPoint();

  const AllChainMarketplacesFetcher = async () => {
    const query = chain ? `?chain=${chain}` : "";
    const mars = await dataApiFetcher(
      `${dataApiEndPoint}${DataApiPaths.markets}${query}`,
    );

    const markets = mars.map((m: any) => {
      // TODO: add chain
      const chain = m.chain || "eth";

      return {
        ...m,
        projectLogo: WithProjectImgCDN(m.market_symbol, chain),
        pointLogo: WithPointImgCDN(m.market_symbol, chain),
        chain,
      };
    });

    return markets as Array<IMarketplace>;
  };

  const res = useSWR(
    `marketplaces-${chain || "all"}`,
    AllChainMarketplacesFetcher,
  );

  return res;
}
