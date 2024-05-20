import { IMarketplace } from "./marketplace";

export interface IOffer {
  offer_id: string;
  amount: string;
  authority: string;
  create_at: string;
  maker_account: string;
  market_place_account: string;
  offer_account: string;
  offer_status: 
    | "unknown"
    | "virgin"
    | "ongoing"
    | "canceled"
    | "filled"
    | "settling"
    | "settled";
  offer_type: string;
  order_note: string;
  points: string;
  settle_breach_fee: string;
  settled_point_token_amount: string;
  settled_points: string;
  total_settled_points: string;
  tx_hash: string;
  used_points: string;

  marketplace: IMarketplace;
}