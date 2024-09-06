import { IOfferType } from "@/components/share/offer-type-select";
import { IMarketplace } from "./marketplace";

export interface IOffer {
  amount: string;
  authority: string;
  create_at: string;
  maker_account: string;
  market_place_account: string;
  points: string;
  tx_hash: string;

  offer_id: string;
  offer_account: string;
  offer_status:
    | "unknown"
    | "virgin"
    | "ongoing"
    | "canceled"
    | "filled"
    | "settling"
    | "settled";
  offer_type: IOfferType;
  order_note: string;
  collateral_rate: string;
  settled_point_token_amount: string;
  settled_points: string;
  total_settled_points: string;
  used_points: string;
  pre_offer_account: string;
  stock_account: string;
  trade_tax: string;
  abort_offer_status:
    | "initialize_v1"
    | "initialize_v2"
    | "allocation_propagated"
    | "aborted";

  marketplace: IMarketplace;
  pre_offer_display: string;
  pre_offer_detail: IOffer;
  origin_offer_detail: IOffer;
}
