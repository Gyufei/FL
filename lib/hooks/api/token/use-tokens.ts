import useSWRImmutable from "swr/immutable";
import type { IToken } from "../../../types/token";
import { useEndPoint } from "../use-endpoint";
import fetcher from "@/lib/fetcher";

export function useTokens() {
  const { tokenEndPoint } = useEndPoint();

  async function tFetcher() {
    const tokens = await fetcher(tokenEndPoint);

    const newTokens = tokens.map((t: Record<string, any>) => {
      const newT = {
        ...t,
        logoURI: t.url
      } as any;

      delete newT.url;

      if (newT.symbol === "WSOL") {
        newT.symbol = "SOL";
      }

      return newT;
    });

    return {
      tokens: newTokens,
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
