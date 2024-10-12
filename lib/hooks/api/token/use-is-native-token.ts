import { useCallback, useMemo } from "react";
import { useCurrentChain } from "../../web3/use-current-chain";
import { IToken } from "@/lib/types/token";

export function useIsNativeToken(token?: IToken | null) {
  const { isEth, isBnb, isSolana } = useCurrentChain();

  const checkIsNativeToken = useCallback(
    (token: IToken | null) => {
      if (!token) return false;

      if (isEth) {
        return token.symbol === "ETH";
      }

      if (isBnb) {
        return token.symbol === "BNB";
      }

      if (isSolana) {
        return token.symbol === "SOL";
      }

      return false;
    },
    [isEth, isBnb, isSolana],
  );

  const isNativeToken = useMemo(() => {
    return checkIsNativeToken(token || null);
  }, [checkIsNativeToken, token]);

  return {
    isNativeToken,
    checkIsNativeToken,
  };
}
