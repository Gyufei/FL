import { useWallet } from "@solana/wallet-adapter-react";
import { useSignIn } from "../api/use-sign-in";
import { useCallback } from "react";
import base58 from "bs58";
import { useSetAtom } from "jotai";
import { AccessTokenAtom } from "@/lib/states/user";

export function useSignInAction() {
  const { publicKey, signMessage } = useWallet();

  const { trigger: signInApiAction } = useSignIn();

  const setToken = useSetAtom(AccessTokenAtom);

  const signInAction = useCallback(async () => {
    try {
      // `publicKey` will be null if the wallet isn't connected
      if (!publicKey) throw new Error("Wallet not connected!");
      // `signMessage` will be undefined if the wallet doesn't support it
      if (!signMessage)
        throw new Error("Wallet does not support message signing!");
      // Encode anything as bytes
      const message = new TextEncoder().encode("Welcome to Tadle!");
      // Sign the bytes using the wallet
      const signature = await signMessage(message);
      // Verify that the bytes were signed using the private key that matches the known public key
      const signatureStr = base58.encode(signature);

      const res = await signInApiAction({
        wallet: publicKey.toBase58(),
        signature: signatureStr,
        ts: String(Math.floor(Date.now() / 1000)),
      });

      if (res.data?.access_token) {
        setToken(res.data.access_token);
      }
    } catch (error: any) {
      console.log("error", `Sign Message failed! ${error?.message}`);
    }
  }, [publicKey, signMessage, signInApiAction, setToken]);

  return {
    signInAction,
  }
}
