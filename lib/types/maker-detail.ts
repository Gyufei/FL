export type ISettleMode = "protected" | "turbo";

export interface IMakerDetail {
  authority: string;
  each_trade_tax: string;
  offer_settle_type: ISettleMode;
  trade_tax: string;
  origin_offer: string;
  token_mint: string;
}
