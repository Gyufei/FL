import { IOffer } from "./offer";

export interface IHolding {
  holding_id: string;
  entries: IHoldingEntry[];
  market_symbol: string;
  status: string;
  create_at: number;

  offer: IOffer;
}

interface IHoldingEntry {
  id: number;
  item_amount: number;
}
