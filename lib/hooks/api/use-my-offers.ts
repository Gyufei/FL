import { useWallet } from "@solana/wallet-adapter-react";
import { useAllOrders } from "./use-all-orders";
import { useMemo } from "react";
import { IOffer } from "@/lib/types/order";

export function useMyOffers() {
  const { publicKey } = useWallet();
  const allOrdersRes = useAllOrders();

  const myOrders = useMemo(
    () => {
      const myAllOrders = (allOrdersRes.data || [])?.filter(
        (order) => order.authority === publicKey?.toBase58(),
      )

      return myAllOrders as Array<IOffer>;
    },
    [allOrdersRes.data, publicKey],
  );

  return {
    ...allOrdersRes,
    data: myOrders,
  };
}
