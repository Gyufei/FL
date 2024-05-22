import { useWallet } from "@solana/wallet-adapter-react";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Paths } from "@/lib/PathMap";
import { useEndPoint } from "./use-endpoint";
import { useOfferResFormat } from "../offer/use-offer-res-format";
import { IOffer } from "@/lib/types/offer";

export function useMyStocks() {
  const { publicKey } = useWallet();
  const { apiEndPoint } = useEndPoint();

  const { offerResFieldFormat, isLoading } = useOfferResFormat();

  const address = publicKey?.toBase58();

  const marketOrdersFetcher = async () => {
    if (!address || isLoading) return [];

    const orderRes = await fetcher(
      `${apiEndPoint}${Paths.myStock}?authority=${address}`,
    );

    const parsedRes = await Promise.all(orderRes.map((o: Record<string, any>) => offerResFieldFormat(o)));

    return parsedRes as Array<IOffer>;
  };

  const res = useSWR(
    `my_stock:${address}${isLoading}`,
    marketOrdersFetcher,
  );

  return {
    ...res,
  };
}
