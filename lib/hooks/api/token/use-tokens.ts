import useSWRImmutable from "swr/immutable";
import type { IToken } from "../../../types/token";
import fetcher from "@/lib/fetcher";
import { EndPointPathMap } from "@/lib/PathMap";

export function useTokens() {
  async function tFetcher() {
    const tokens = await fetcher(EndPointPathMap.solanaToken);

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
  }>(EndPointPathMap.solanaToken, tFetcher);

  return {
    data: data?.tokens,
    isLoading,
    error,
  };
}
