import useSWRImmutable from "swr/immutable";
import type { IToken } from "../../types/token";
import { useEndPoint } from "./use-endpoint";
import fetcher from "@/lib/fetcher";

export function useTokens() {
  const { tokenEndPoint } = useEndPoint();

  async function tFetcher() {
    const tokens = await fetcher(tokenEndPoint);

    return {
      tokens,
    };
  }

  const { data, isLoading, error } = useSWRImmutable<{
    tokens: Array<IToken>;
  }>(tokenEndPoint, tFetcher);

  return {
    data: data?.tokens,
    isLoading,
    error,
  };
}
