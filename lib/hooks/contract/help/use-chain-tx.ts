import { useMemo } from "react";
import { ChainType } from "@/lib/types/chain";
import { isEvmChain } from "@/lib/utils/web3";
import { useCheckSwitchChain } from "../../web3/use-check-switch-chain";

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
  chain: ChainType,
  hookEth: (args: T) => K,
  hookSolana: (args: T) => K,
  args: T,
): BaseHookResult {
  const isEvm = isEvmChain(chain);
  const isSolana = chain === ChainType.SOLANA;
  const { checkAndSwitchChain } = useCheckSwitchChain(chain);

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

  const write = async (args: any) => {
    try {
      const res = await checkAndSwitchChain();

      if (res) {
        return chainActionRes.write(args);
      }
    } catch (e) {
      console.error(e);
      return;
    }
  };

  return {
    ...chainActionRes,
    write,
  };
}
