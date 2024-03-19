import { useWallet } from "@solana/wallet-adapter-react";
import { useAllOrders } from "./use-all-orders";
import { useMemo } from "react";

export function useMyOrders() {
  const { publicKey } = useWallet();
  const allOrdersRes = useAllOrders();

  const myOrders = useMemo(
    () =>
      (allOrdersRes.data || [])?.filter(
        (order) => order.authority === publicKey?.toBase58(),
      ),
    [allOrdersRes.data, publicKey],
  );

  return {
    ...allOrdersRes,
    data: myOrders,
  };
}
