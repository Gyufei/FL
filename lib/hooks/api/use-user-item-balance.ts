import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { Paths } from "@/lib/PathMap";
import fetcher from "@/lib/fetcher";

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
  const { apiEndPoint } = useEndPoint();

  const res = useSWR<IItemBalance>(
    wallet ? `${apiEndPoint}${Paths.userItemBalance}/${wallet}` : null,
    fetcher,
  );

  return res;
}
