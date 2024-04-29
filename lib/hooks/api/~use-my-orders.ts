import { useWallet } from "@solana/wallet-adapter-react";
import { IOrder } from "@/lib/types/order";
import { useEndPoint } from "./use-endpoint";
import { useOrderResFormat } from "../order/use-order-res-format";
import fetcher from "@/lib/fetcher";
import { Paths } from "@/lib/PathMap";
import useSWR from "swr";

export function useMyOrders() {
  const { publicKey } = useWallet();
  const { apiEndPoint } = useEndPoint();

  const { orderResFieldFormat, orderResPreDetailFormat } = useOrderResFormat();

  const address = publicKey?.toBase58();

  const marketOrdersFetcher = async () => {
      const orderRes = await fetcher(
        `${apiEndPoint}${Paths.myOrder}?authority=${address}`,
      );

      let parsedRes = orderRes?.orderRes.map((o: Record<string, any>) => orderResFieldFormat(o));
      parsedRes = parsedRes.map((o: Record<string, any>) => orderResPreDetailFormat(o, parsedRes));

      return parsedRes as Array<IOrder>;
  };

  const res = useSWR(
    `my_order:${address}`,
    marketOrdersFetcher,
  );

  return {
    ...res,
  };
}
