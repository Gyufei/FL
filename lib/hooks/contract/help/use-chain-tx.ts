import { useMemo } from "react";
import { useCurrentChain } from "../../web3/use-current-chain";

interface BaseHookResult {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
  data: any;
  write: (...args: any) => any;
  [key: string]: any;
}

export function useChainTx<T = any, K extends BaseHookResult = BaseHookResult>(
  hookEth: (args: T) => K,
  hookSolana: (args: T) => K,
  args: T,
): BaseHookResult {
  const { isEth, isSolana } = useCurrentChain();

  const actionResEth = hookEth(args);
  const actionResSol = hookSolana(args);

  const chainActionRes = useMemo(() => {
    if (isEth) {
      return actionResEth;
    }

    if (isSolana) {
      return actionResSol;
    }

    return {
      isLoading: false,
      isSuccess: false,
      isError: false,
      error: null,
      data: null,
      write: () => {},
    };
  }, [actionResEth, actionResSol, isEth, isSolana]);

  return chainActionRes;
}
