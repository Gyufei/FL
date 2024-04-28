import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { Paths } from "@/lib/PathMap";
import fetcher from "@/lib/fetcher";

export interface TakerOrder {
  create_at: string;
  deposits: string;
  from: string;
  points: string;
  sub_no: string;
  to: string;
  total_points: string;
  tx_hash: string;
  order_id: string;
}

export function useTakerOrders(preOrderId: string, makerId?: string) {
  const { apiEndPoint } = useEndPoint();

  const res = useSWR<Array<TakerOrder>>(
    `${apiEndPoint}${Paths.takerOrders}?${
      preOrderId ? `pre_order_id=${preOrderId}` : ""
    }${makerId ? `&maker_id=${makerId}` : ""}`,
    fetcher,
  );

  return res;
}
