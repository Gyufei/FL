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

export function useTakerOrders(preOfferAccount: string, makerAccount?: string) {
  const { apiEndPoint } = useEndPoint();

  const res = useSWR<Array<TakerOrder>>(
    null && `${apiEndPoint}${Paths.takerOrders}?${
      preOfferAccount ? `pre_offer_account=${preOfferAccount}` : ""
    }${makerAccount ? `&maker_account=${makerAccount}` : ""}`,
    fetcher,
  );

  return res;
}
