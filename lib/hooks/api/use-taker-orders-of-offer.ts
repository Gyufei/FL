import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { DataApiPaths } from "@/lib/PathMap";

export interface ITakerOrder {
  order_id: string;
  taker: string;
  create_at: number;
  item_amount: string;
  price: string;
  notional_value: string;
  tx_hash: string;
}

export function useTakerOrderOfOffers({ offerId }: { offerId: string }) {
  const { dataApiEndPoint } = useEndPoint();

  const res = useSWR<Array<ITakerOrder>>(
    `${dataApiEndPoint}${DataApiPaths.offer}/${offerId}/taker_orders`,
  );

  return res;
}
