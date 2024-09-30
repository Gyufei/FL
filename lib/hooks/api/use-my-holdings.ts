import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Paths } from "@/lib/PathMap";
import { useEndPoint } from "./use-endpoint";
import { useHoldingResFormat } from "../holding/use-holding-res-format";
import { IHolding } from "@/lib/types/holding";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { useCurrentChain } from "../web3/use-current-chain";

export function useMyHoldings() {
  const { address } = useChainWallet();
  const { apiEndPoint } = useEndPoint();

  const { stockResFieldFormat, isLoading } = useHoldingResFormat();
  const { currentChainInfo } = useCurrentChain();

  // const tempAddress = 'D7jbXQgpQVr4J4xWtzDPKAgqLrrRWZ2NKrBmiGwyAceN';
  const marketOrdersFetcher = async () => {
    if (!address || isLoading) return [];

    const orderRes = await fetcher(
      `${apiEndPoint}${Paths.myStock}?authority=${address}`,
      // `${apiEndPoint}${Paths.myStock}?authority=${tempAddress}`,
    );

    const filedRes = orderRes
      .map((o: Record<string, any>) => {
        const res = {
          ...o,
          offer_account: o.offer,
          pre_offer_account: o.pre_offer,
        };

        return res;
      })
      .filter(
        (o: Record<string, any>) =>
          o.pre_offer_account !== currentChainInfo.zeroAddr,
      );

    const parsedRes = await Promise.all(
      filedRes.map((o: Record<string, any>) => stockResFieldFormat(o)),
    );

    return parsedRes as Array<IHolding>;
  };

  const res = useSWR(`my_stock:${address}${isLoading}`, marketOrdersFetcher);

  return {
    ...res,
  };
}
