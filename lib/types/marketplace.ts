import { ChainType } from "./chain";

export interface IMarketplace {
  id: number;
  last_price: string;
  last_price_24h_ago: string;
  minimum_price: string;
  market_name: string;
  floor_price: string;
  total_vol: string;
  filled_orders: string;
  change_rate_24h: string;
  vol_24h: string;
  listed_supply: string;
  avg_bid: string;
  tge: string;
  settlement_period: string;
  status: string;
  market_place_id: string;
  market_symbol: string;
  market_catagory: string;
  item_name: string;
  project_token_addr: string;
  token_per_item: string;
  is_fungible: boolean;
  require_collateral: boolean;
  market_place_account: string;

  projectLogo: string;
  pointLogo: string;
  chain: ChainType;
}
