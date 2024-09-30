import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useMemo } from "react";
import { useSignMessage } from "wagmi";
import base58 from "bs58";
import { useCurrentChain } from "./use-current-chain";

export function useChainSignMessage() {
  const { isEvm, isSolana } = useCurrentChain();

  const { signMessageAsync: ethSignMessage } = useSignMessage();

  const { signMessage: solSignMessage } = useWallet();

  const evmSignAction = useCallback(
    async (msg: string) => {
      const result = ethSignMessage({ message: msg });
      return result;
    },
    [ethSignMessage],
  );

  const solSignAction = useCallback(
    async (msg: string) => {
      if (!solSignMessage) return;
      const message = new TextEncoder().encode(msg);
      const signature = await solSignMessage(message);
      const signatureStr = base58.encode(signature);
      return signatureStr;
    },
    [solSignMessage],
  );

  const signMessage = useMemo(() => {
    if (isEvm) {
      return evmSignAction;
    }

    if (isSolana) {
      return solSignAction;
    }
  }, [isEvm, isSolana, evmSignAction, solSignAction]);

  return {
    signMessage,
  };
}
