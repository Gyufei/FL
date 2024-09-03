import { useSignIn } from "@/lib/hooks/api/use-sign-in";
import { useCallback } from "react";
import { useSetAtom } from "jotai";
import { AccessTokenAtom, ShowSignDialogAtom } from "@/lib/states/user";
import { useChainWallet } from "./use-chain-wallet";
import { useChainSignMessage } from "./use-chain-sign-message";

export function useSignInAction() {
  const { address } = useChainWallet();
  const { signMessage } = useChainSignMessage();

  const { trigger: signInApiAction } = useSignIn();

  const setToken = useSetAtom(AccessTokenAtom);

  const setShowSignInDialog = useSetAtom(ShowSignDialogAtom);

  const signInAction = useCallback(async () => {
    try {
      if (!address) throw new Error("Wallet not connected!");
      if (!signMessage)
        throw new Error("Wallet does not support message signing!");
      const message = "Welcome to Tadle!";
      const signatureStr = await signMessage(message);
      console.log("signatureStr", signatureStr);

      const res = await signInApiAction({
        wallet: address,
        signature: signatureStr || "",
        ts: String(Math.floor(Date.now() / 1000)),
      });

      if (res?.access_token) {
        setToken(res.access_token);
        setShowSignInDialog(false);
      }
    } catch (error: any) {
      console.log("error", `Sign Message failed! ${error?.message}`);
    }
  }, [address, signMessage, signInApiAction, setToken, setShowSignInDialog]);

  return {
    signInAction,
  };
}
