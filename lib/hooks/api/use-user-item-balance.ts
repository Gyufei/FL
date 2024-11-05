import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { DataApiPaths } from "@/lib/PathMap";
import { dataApiFetcher } from "@/lib/fetcher";

export interface IItemBalance {
  available: number;
  locked: number;
}

export function useUserItemBalance(wallet: string, marketSymbol: string) {
  const { dataApiEndPoint } = useEndPoint();

  const res = useSWR<IItemBalance>(
    wallet
      ? `${dataApiEndPoint}${
          DataApiPaths.userItemBalance
        }/${"0xdBbEf79D460Df7e9f017104b8803A0dC68014524"}?market_symbol=${"spherex"}&chain=${"bnb"}`
      : null,
    dataApiFetcher,
  );

  return res;
}
