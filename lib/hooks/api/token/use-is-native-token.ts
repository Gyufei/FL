import { useCallback, useMemo } from "react";
import { useCurrentChain } from "../../web3/use-current-chain";
import { IToken } from "@/lib/types/token";

export function useIsNativeToken(token?: IToken | null) {
  const { isEth, isSolana } = useCurrentChain();

  const checkIsNativeToken = useCallback(
    (token: IToken | null) => {
      if (!token) return false;

      if (isEth) {
        return token.symbol === "ETH";
      }

      if (isSolana) {
        return token.symbol === "SOL";
      }

      return false;
    },
    [isEth, isSolana],
  );

  const isNativeToken = useMemo(() => {
    return checkIsNativeToken(token || null);
  }, [checkIsNativeToken, token]);

  return {
    isNativeToken,
    checkIsNativeToken,
  };
}
