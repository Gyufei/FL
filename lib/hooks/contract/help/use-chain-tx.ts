import { useMemo } from "react";
import { useCurrentChain } from "../../web3/use-current-chain";

export function useChainTx(
  hookEth: any,
  hookSolana: any,
  args: Record<string, any> | undefined,
) {
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
  }, [actionResEth, actionResSol, isEth, isSolana]);

  return chainActionRes;
}
