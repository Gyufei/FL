import { IOfferType } from "@/components/share/offer-type-select";
import { IOffer } from "./offer";
import { IMarketplace } from "./marketplace";

export interface IStock {
  amount: string;
  authority: string;
  create_at: number;
  maker_account: string;
  market_place_account: string;
  points: string;
  stock_account: string;
  stock_id: string;
  stock_type: IOfferType,
  stock_status: "unknown" |
            "initialized" |
            "finished"
  tx_hash: string;

  offer: string;
  pre_offer: string;
  offer_detail: IOffer;
  pre_offer_detail: IOffer;

  offer_account: string;
  pre_offer_account: string;

  marketplace: IMarketplace;
}