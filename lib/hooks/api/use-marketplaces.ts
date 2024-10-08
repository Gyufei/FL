import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Paths, WithPointImgCDN, WithProjectImgCDN } from "@/lib/PathMap";

import { useEndPoint } from "./use-endpoint";
import { IMarketplace } from "@/lib/types/marketplace";
import { useCurrentChain } from "../web3/use-current-chain";
import { useMemo } from "react";

export function useAllChainMarketplaces() {
  // TODO: BSC add
  // const { ethApiEndPoint, solanaApiEndPoint, bscApiEndPoint } = useEndPoint();
  const { ethApiEndPoint, solanaApiEndPoint } = useEndPoint();

  const AllChainMarketplacesFetcher = async () => {
    const [ethRes, bscRes, solanaRes] = await Promise.all([
      fetcher(`${ethApiEndPoint}${Paths.marketplace}?market_type=point`),
      [],
      // fetcher(`${bscApiEndPoint}${Paths.marketplace}?market_type=point`),
      fetcher(`${solanaApiEndPoint}${Paths.marketplace}?market_type=point`),
    ]);

    const processMarketplaces = (markets: any[], chain: string) => {
      return (markets || []).map((market) => ({
        ...market,
        projectLogo: WithProjectImgCDN(market.market_id, chain),
        pointLogo: WithPointImgCDN(market.market_id, chain),
        chain,
      }));
    };

    const ethMarkets = processMarketplaces(ethRes, "eth");
    const bscMarkets = processMarketplaces(bscRes, "bsc");
    const solanaMarkets = processMarketplaces(solanaRes, "solana");

    return [
      ...ethMarkets,
      ...bscMarkets,
      ...solanaMarkets,
    ] as Array<IMarketplace>;
  };

  const res = useSWR("all-chain-marketplaces", AllChainMarketplacesFetcher);

  return res;
}

export function useMarketplaces() {
  const { currentChainInfo } = useCurrentChain();
  const allMarketRes = useAllChainMarketplaces();

  const marketData = useMemo(() => {
    return allMarketRes.data?.filter(
      (market) => market.chain === currentChainInfo.alias,
    );
  }, [allMarketRes.data, currentChainInfo]);

  return {
    ...allMarketRes,
    data: marketData,
  };
}
