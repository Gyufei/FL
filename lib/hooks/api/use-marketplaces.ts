import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Paths, WithPointImgCDN, WithProjectImgCDN } from "@/lib/PathMap";

import { useEndPoint } from "./use-endpoint";
import { IMarketplace } from "@/lib/types/marketplace";
import { useCurrentChain } from "../web3/use-current-chain";
import { useMemo } from "react";

export function useAllChainMarketplaces() {
  const { ethApiEndPoint, solanaApiEndPoint } = useEndPoint();

  const AllChainMarketplacesFetcher = async () => {
    const [ethRes, solanaRes] = await Promise.all([
      fetcher(`${ethApiEndPoint}${Paths.marketplace}?market_type=point`),
      fetcher(`${solanaApiEndPoint}${Paths.marketplace}?market_type=point`),
    ]);

    const processMarketplaces = (markets: any[], isEth: boolean) => {
      return (markets || []).map((market) => ({
        ...market,
        projectLogo: WithProjectImgCDN(market.market_id, isEth),
        pointLogo: WithPointImgCDN(market.market_id, isEth),
        chain: isEth ? "eth" : "solana",
      }));
    };

    const ethMarkets = processMarketplaces(ethRes, true);
    const solanaMarkets = processMarketplaces(solanaRes, false);

    return [...ethMarkets, ...solanaMarkets] as Array<IMarketplace>;
  };

  const res = useSWR("all-chain-marketplaces", AllChainMarketplacesFetcher);

  return res;
}

export function useMarketplaces() {
  const { isEth } = useCurrentChain();
  const allMarketRes = useAllChainMarketplaces();

  const currentChain = isEth ? "eth" : "solana";

  const marketData = useMemo(() => {
    return allMarketRes.data?.filter((market) => market.chain === currentChain);
  }, [allMarketRes.data, currentChain]);

  return {
    ...allMarketRes,
    data: marketData,
  };
}
