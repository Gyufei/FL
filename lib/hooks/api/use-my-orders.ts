// import { IOffer } from "@/lib/types/offer";
// import { IOrder } from "@/lib/types/order";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Paths } from "@/lib/PathMap";
import { useEndPoint } from "./use-endpoint";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { useCurrentChain } from "@/lib/hooks/web3/use-current-chain";

import { useMarketOffers } from "@/lib/hooks/api/use-market-offers";

export function useMyOrders() {
  const { address } = useChainWallet();
  const { isEth, isBnb } = useCurrentChain();
  const chain = isEth ? "ethereum" : isBnb ? "binance" : "solana";
  // const address = "0x1cf00f501b1ebea5e58c68ad1317c9fbb01704f7";
  // const chain = "sepolia";
  const { apiEndPoint } = useEndPoint();
  const { data: offers, isLoading } = useMarketOffers({
    marketSymbol: null,
    marketChain: chain,
  });

  const myOrdersFetcher = async () => {
    if (!address || isLoading) return [];
    const orderRes = await fetcher(
      `${apiEndPoint}${Paths.orders}?wallet=${address}&chain=${chain}`,
    );

    const parsedRes = (orderRes || []).map((order: any) => {
      const matchingOffer = offers?.find(
        (offer: any) => offer.entry.id === order.entry.id,
      );
      return {
        ...order,
        offer: matchingOffer || null,
      };
    });
    return parsedRes as Array<any>;
  };

  const res = useSWR(`my_order:${address}${isLoading}`, myOrdersFetcher);

  return {
    ...res,
  };
}
