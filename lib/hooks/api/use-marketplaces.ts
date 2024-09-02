import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Paths, WithPointImgCDN, WithProjectImgCDN } from "@/lib/PathMap";

import { useEndPoint } from "./use-endpoint";
import { IMarketplace } from "@/lib/types/marketplace";
import { useCurrentChain } from "../web3/use-current-chain";

export function useMarketplaces() {
  const { apiEndPoint } = useEndPoint();
  const { isEth } = useCurrentChain();

  const MarketplacesFetcher = async () => {
    const res = await fetcher(
      `${apiEndPoint}${Paths.marketPlace}?market_type=point`,
    );

    for (const market of res || []) {
      market.projectLogo = WithProjectImgCDN(market.market_id, isEth);
      market.pointLogo = WithPointImgCDN(market.market_id, isEth);
      market.chain = isEth ? "eth" : "solana";
    }

    return res as Array<IMarketplace>;
  };

  const res = useSWR(`${apiEndPoint}marketplaces`, MarketplacesFetcher);

  return res;
}
