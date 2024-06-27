import { useMemo } from "react";
import { useTokens } from "./use-tokens";

export function useStableToken() {
  const { data: tokens, isLoading } = useTokens();

  const stableTokens = useMemo(() => {
    const stableTokenList = ['USDC', 'SOL'];
    if (!tokens) return [];

    return tokens.filter((t) => stableTokenList.includes(t.symbol));
  }, [tokens]);

  return {
    data: stableTokens,
    isLoading
  }
}
