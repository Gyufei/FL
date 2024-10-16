export interface IToken {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  chainId: number;
  ratingScore: string;
  [key: string]: any;
}

export interface IPoint {
  symbol: string;
  logoURI: string;
  marketplaceId: string;
  marketName: string;
}
