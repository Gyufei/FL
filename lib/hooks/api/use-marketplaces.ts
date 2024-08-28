import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Paths, WithPointImgCDN, WithProjectImgCDN } from "@/lib/PathMap";

import { useEndPoint } from "./use-endpoint";
import { IMarketplace } from "@/lib/types/marketplace";

export function useMarketplaces() {
  const { apiEndPoint } = useEndPoint();

  const MarketplacesFetcher = async () => {
    const res = await fetcher(
      `${apiEndPoint}${Paths.marketPlace}?market_type=point`,
    );

    for (const market of res || []) {
      market.projectLogo = WithProjectImgCDN(market.market_id);
      market.pointLogo = WithPointImgCDN(market.market_id);
    }

    return res as Array<IMarketplace>;
  };

  const res = useSWR("marketplaces", MarketplacesFetcher);

  return res;
}
