import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { DataApiPaths } from "@/lib/PathMap";
import { dataApiFetcher } from "@/lib/fetcher";

export interface IItemBalance {
  market_symbol: string;
  total_amount: number;
  entries: IItemEntry[];
}

interface IItemEntry {
  entry_id: number;
  item_amount: number;
  status: string;
}

export function useUserItemBalance(wallet: string) {
  const { dataApiEndPoint } = useEndPoint();

  const res = useSWR<IItemBalance>(
    wallet
      ? `${dataApiEndPoint}${DataApiPaths.userItemBalance}/${wallet}`
      : null,
    dataApiFetcher,
  );

  return res;
}
