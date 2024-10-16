import fetcher from "@/lib/fetcher";
import { Paths } from "@/lib/PathMap";

const MarketOffersMap = new Map<string, Array<Record<string, any>>>();

export async function getMarketOffer(
  apiPath: string,
  marketSymbol: string,
  marketChain: string,
) {
  const marketOffers = MarketOffersMap.get(marketSymbol);

  if (marketOffers) {
    return marketOffers;
  }

  const res = await fetcher(
    `${apiPath}${Paths.offers}?market_symbol=${marketSymbol}&chain=${marketChain}`,
  );

  MarketOffersMap.set(marketSymbol, res);

  return res;
}
