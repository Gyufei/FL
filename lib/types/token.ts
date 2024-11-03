import { IMarketplace } from "./marketplace";
import { ChainType } from "./chain";

export interface IToken {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  chainId: number;
  chain: ChainType;
  ratingScore: string;
  [key: string]: any;
}

export interface IPoint {
  symbol: string;
  logoURI: string;
  marketplace: IMarketplace;
}
