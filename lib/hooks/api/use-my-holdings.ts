import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Paths } from "@/lib/PathMap";
import { useEndPoint } from "./use-endpoint";
import { useStockResFormat } from "../stock/use-stock-res-format";
import { IHolding } from "@/lib/types/holding";
import { SolanaZeroed } from "@/lib/const/solana";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";

export function useMyHoldings() {
  const { address } = useChainWallet();
  const { apiEndPoint } = useEndPoint();

  const { stockResFieldFormat, isLoading } = useStockResFormat();

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
          pre_offer_account: o.pre_offer_account,
        };

        return res;
      })
      .filter((o: Record<string, any>) => o.pre_offer_account !== SolanaZeroed);

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
