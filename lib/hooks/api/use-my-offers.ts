import { IOffer } from "@/lib/types/offer";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Paths } from "@/lib/PathMap";
import { useEndPoint } from "./use-endpoint";
import { useOfferResFormat } from "../offer/use-offer-res-format";
import useWalletInfo from "../web3/use-wallet-info";

export function useMyOffers() {
  const { address } = useWalletInfo();
  const { apiEndPoint } = useEndPoint();

  const { offerResFieldFormat: orderResFieldFormat, isLoading } =
    useOfferResFormat();

  const marketOrdersFetcher = async () => {
    if (!address || isLoading) return [];

    const orderRes = await fetcher(
      `${apiEndPoint}${Paths.myOffer}?authority=${address}`,
    );

    const parsedRes = await Promise.all(
      orderRes.map((o: Record<string, any>) => orderResFieldFormat(o)),
    );

    return parsedRes as Array<IOffer>;
  };

  const res = useSWR(`my_offer:${address}${isLoading}`, marketOrdersFetcher);

  return {
    ...res,
  };
}
