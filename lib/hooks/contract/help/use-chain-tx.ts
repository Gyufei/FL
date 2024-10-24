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
  const { isEvm, isSolana } = useCurrentChain();

  const actionResEvm = hookEth(args);
  const actionResSol = hookSolana(args);

  const chainActionRes = useMemo(() => {
    if (isEvm) {
      return actionResEvm;
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
  }, [actionResEvm, actionResSol, isEvm, isSolana]);

  return chainActionRes;
}
