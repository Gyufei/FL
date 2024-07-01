import { Paths } from "@/lib/PathMap";
import fetcher from "@/lib/fetcher";
import useSWR from "swr";
import { useEndPoint } from "../use-endpoint";
import { useMemo } from "react";

export function useTokenPrice(address: string) {
  const { apiEndPoint } = useEndPoint();

  const res = useSWR<any>(
    `${apiEndPoint}${Paths.tokenPrice}`,
    fetcher,
  );

  const tokenPrice = useMemo(() => {
    if (!res) return '1';
    const data = res.data?.find((t: any) => t.token_mint === address);
    return data?.token_price || '1';
  }, [res, address])

  return {
    ...res,
    data: tokenPrice,
  };
}