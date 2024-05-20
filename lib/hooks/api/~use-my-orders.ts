import { useWallet } from "@solana/wallet-adapter-react";
import { IOffer } from "@/lib/types/order";
import { useEndPoint } from "./use-endpoint";
import { useOrderResFormat } from "../offer/use-order-res-format";
import fetcher from "@/lib/fetcher";
import { Paths } from "@/lib/PathMap";
import useSWR from "swr";

export function useMyOrders() {
  const { publicKey } = useWallet();
  const { apiEndPoint } = useEndPoint();

  const { orderResFieldFormat } = useOrderResFormat();

  const address = publicKey?.toBase58();

  const marketOrdersFetcher = async () => {
      const orderRes = await fetcher(
        `${apiEndPoint}${Paths.myOrder}?authority=${address}`,
      );

      const parsedRes = orderRes?.orderRes.map((o: Record<string, any>) => orderResFieldFormat(o));

      return parsedRes as Array<IOffer>;
  };

  const res = useSWR(
    `my_order:${address}`,
    marketOrdersFetcher,
  );

  return {
    ...res,
  };
}
