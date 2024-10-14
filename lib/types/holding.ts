import { IOfferType } from "@/components/share/offer-type-select";
import { IOffer } from "./offer";
import { IMarketplace } from "./marketplace";

export interface IHolding {
  amount: string;
  authority: string;
  create_at: number;
  offer_maker: string;
  market_place_account: string;
  points: string;
  stock_account: string;
  stock_id: string;
  stock_type: IOfferType;
  stock_status: "unknown" | "initialized" | "finished";
  tx_hash: string;

  offer: string;
  offer_detail: IOffer;
  pre_offer_display: string;
  pre_offer_detail: IOffer;

  offer_id: string;
  pre_offer_account: string;

  marketplace: IMarketplace;
}
