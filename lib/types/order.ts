import { IMarketplace } from "./marketplace";

export interface IOrder {
  amount: string;
  market_id: string,
  order_role: "Maker" | "Taker";
  marketplace: IMarketplace;
  preOrderDetail: IOrder | null;
  authority: string;
  create_at: string;
  maker_amount: string;
  maker_id: string;
  maker_status:
    | "unknown"
    | "virgin"
    | "ongoing"
    | "canceled"
    | "filled"
    | "settling"
    | "settled";
  taker_status: "unknown" | "initialized" | "finished" | "settled";
  maker_tx_hash: string;
  order: string;
  order_id: string;
  order_note: string;
  order_type: string;
  points: string;
  pre_order: string;
  pre_order_included_zero: string;
  relist_at: string;
  settle_breach_fee: string;
  settled_points: string;
  taker_amount: string;
  taker_tx_hash: string;
  used_points: string;
  is_relist: boolean;
}
