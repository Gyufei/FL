export interface IMarketplace {
  id: number;
  last_price: string;
  last_price_24h_ago: string;
  market_place_id: string;
  market_id: string;
  minimum_price: string;
  market_type: 'point' | 'mock',
  market_name: string;
  floor_price: string;
  total_vol: string;
  filled_orders: string;
  change_rate_24h: string;
  vol_24h: string;
  listed_supply: string;
  avg_bid: string;
  token_mint: string;
  token_per_point: string;
  tge: string;
  point_name: string;
  settlement_period: string;
  status: string;
  trade_spread: string;

  projectLogo: string;
  pointLogo: string;
  chain: string;
}
