import { useWallet } from "@solana/wallet-adapter-react";
import { useAllOrders } from "./use-all-orders";
import { useMemo } from "react";

export function useMyOrders() {
  const { publicKey } = useWallet();
  const allOrdersRes = useAllOrders();

  const myOrders = useMemo(
    () => {
      const myAllOrders = (allOrdersRes.data || [])?.filter(
        (order) => order.authority === publicKey?.toBase58(),
      )

      const newAllOrders = [];

      for (const order of myAllOrders) {
        if (order.is_relist && order.order_role === "Maker") {
          newAllOrders.push(order);
          newAllOrders.push({
            ...order,
            order_role: 'Taker',
            order_type: order.order_type === 'ask' ? 'bid' : 'ask'
          })
        } else {
          newAllOrders.push(order);
        }
      }

      return newAllOrders;
    },
    [allOrdersRes.data, publicKey],
  );

  return {
    ...allOrdersRes,
    data: myOrders,
  };
}
