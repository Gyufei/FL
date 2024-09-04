import { IOffer } from "@/lib/types/offer";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Paths } from "@/lib/PathMap";
import { useEndPoint } from "./use-endpoint";
import { useOfferResFormat } from "../offer/use-offer-res-format";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { getMarketOffers } from "@/lib/helper/market-offer-cache";

export function useMyOffers() {
  const { address } = useChainWallet();
  const { apiEndPoint } = useEndPoint();

  const { offerResFieldFormat, isLoading } = useOfferResFormat();

  const marketOrdersFetcher = async () => {
    if (!address || isLoading) return [];

    const orderRes = await fetcher(
      `${apiEndPoint}${Paths.myOffer}?authority=${address}`,
    );

    const marketOffers = await getMarketOffers(
      apiEndPoint,
      orderRes.map((o: Record<string, any>) => o.market_place_account),
    );

    const parsedRes = await Promise.all(
      orderRes.map((o: Record<string, any>) =>
        offerResFieldFormat(o, marketOffers[o.market_place_account]),
      ),
    );

    return parsedRes as Array<IOffer>;
  };

  const res = useSWR(`my_offer:${address}${isLoading}`, marketOrdersFetcher);

  return {
    ...res,
  };
}
