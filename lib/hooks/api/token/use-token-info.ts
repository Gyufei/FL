import { IToken } from "@/lib/types/token";
import { useTokens } from "./use-tokens";
import { useCallback, useMemo } from "react";

export function useTokensInfo(
  address: Array<string | null>,
): Array<IToken | null> {
  const { data: tokens } = useTokens();

  const getTokenInfo = useCallback((addr: string | null) => {
    if (!addr) return null;
    if (!tokens?.length) return null;

    const tInfo = tokens.find((t) => t.address === addr);

    return tInfo!;
  }, [tokens]);

  const tInfos = useMemo(() => address.map((addr) => getTokenInfo(addr)), [address, getTokenInfo]);

  return tInfos;
}
