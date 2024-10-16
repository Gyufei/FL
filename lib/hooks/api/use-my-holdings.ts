import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Paths } from "@/lib/PathMap";
import { useEndPoint } from "./use-endpoint";
import { IHolding } from "@/lib/types/holding";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { useMarketplaces } from "./use-marketplaces";

export function useMyHoldings(chain?: string) {
  const { address } = useChainWallet();
  const { apiEndPoint } = useEndPoint();

  const { data: marketplaceData, isLoading } = useMarketplaces();

  // const tempAddress = 'D7jbXQgpQVr4J4xWtzDPKAgqLrrRWZ2NKrBmiGwyAceN';
  const holdingFetch = async () => {
    if (!address || isLoading) return [];

    const holdingRes = await fetcher(
      `${apiEndPoint}${Paths.holding}?wallet=${address}&chain=${chain}`,
    );

    const holdings = holdingRes.map((h: any) => {
      const marketplace = marketplaceData?.find(
        (m) => m.market_symbol === h.market_symbol,
      );

      return {
        ...h,
        marketplace,
      };
    });

    return holdings as Array<IHolding>;
  };

  const res = useSWR(`my_stock:${address}${isLoading}`, holdingFetch);

  return res;
}
