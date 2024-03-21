import { IMarketplace } from "./marketplace";

export interface IOrder {
  order_id: string;
  order: string;
  maker_id: string;
  authority: string;
  pre_order: string;
  points: string;
  amount: string;
  used_points: string;
  settled_points: string;
  settle_breach_fee: string;
  order_status:
  | "unknown"
  | "virgin"
  | "ongoing"
  | "canceled"
  | "settled"
  | "finished";
  order_type: "ask" | "bid";
  create_at: string;
  order_note: string;
  marketplace: IMarketplace;
  order_tx_hash: string;
  relist_tx_hash: string;
  relist_at: string;
  preOrderDetail: IOrder | null;
}
