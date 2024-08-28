import { useEffect, useMemo } from "react";
import { useCurrentChain } from "../../web3/use-current-chain";
import { useSetAtom } from "jotai";
import { GlobalMessageAtom } from "@/lib/states/global-message";

export function useChainTx(
  hookEth: any,
  hookSolana: any,
  args: Record<string, any> | undefined,
) {
  const setGlobalMessage = useSetAtom(GlobalMessageAtom);
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

  useEffect(() => {
    if (isEth && actionResEth.isSuccess) {
      setGlobalMessage({
        type: "success",
        message: "Successfully",
      });
    }

    if (isEth && actionResEth.isError) {
      // setGlobalMessage({
      //   type: "error",
      //   message: e?.message || errorTip || "Fail: Some error occur",
      // });
      console.error("error", actionResEth.error);
    }
  }, [isEth, actionResEth, setGlobalMessage]);

  return chainActionRes;
}
