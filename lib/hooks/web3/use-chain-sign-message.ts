import { ENetworks, NetworkAtom } from "@/lib/states/network";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAtomValue } from "jotai";
import { useCallback, useMemo } from "react";
import { useSignMessage } from "wagmi";
import base58 from "bs58";

export function useChainSignMessage() {
  const network = useAtomValue(NetworkAtom);

  const { signMessageAsync: ethSignMessage } = useSignMessage();

  const { signMessage: solSignMessage } = useWallet();

  const ethSignAction = useCallback(
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
    if (network === ENetworks.Eth) {
      return ethSignAction;
    }

    if (network === ENetworks.Solana) {
      return solSignAction;
    }
  }, [network, ethSignAction, solSignAction]);

  return {
    signMessage,
  };
}
