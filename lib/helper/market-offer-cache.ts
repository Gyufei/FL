import fetcher from "@/lib/fetcher";
import { Paths } from "@/lib/PathMap";

const MarketOffersMap = new Map<string, Array<Record<string, any>>>();

export async function getMarketOffer(apiPath: string, marketAccount: string) {
  const marketOffers = MarketOffersMap.get(marketAccount);

  if (marketOffers) {
    return marketOffers;
  }

  const res = await fetcher(
    `${apiPath}${Paths.offer}?market_place_account=${marketAccount}`,
  );

  MarketOffersMap.set(marketAccount, res);

  return res;
}

export async function getMarketOffers(
  apiPath: string,
  marketAccounts: string[],
) {
  const uniqueAccounts = Array.from(new Set(marketAccounts));
  const result: Record<string, Array<Record<string, any>>> = {};

  for (const marketAccount of uniqueAccounts) {
    const offers = await getMarketOffer(apiPath, marketAccount);
    result[marketAccount] = offers;
  }

  return result;
}
