import { useMemo } from "react";
import { useTokens } from "./use-tokens";
import { useCurrentChain } from "@/lib/hooks/web3/use-current-chain";

export function useStableToken() {
  const { isEth, isSolana } = useCurrentChain();
  const { data: tokens, isLoading } = useTokens();

  const stableTokens = useMemo(() => {
    const stableTokenList = isEth
      ? ["USDT", "WETH"]
      : isSolana
      ? ["USDC", "SOL"]
      : [];

    if (!tokens) return [];

    return tokens.filter((t) => stableTokenList.includes(t.symbol));
  }, [tokens, isEth, isSolana]);

  return {
    data: stableTokens,
    isLoading,
  };
}
