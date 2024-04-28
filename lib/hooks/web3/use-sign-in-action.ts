import { useWallet } from "@solana/wallet-adapter-react";
import { useSignIn } from "../api/use-sign-in";
import { useCallback } from "react";
import base58 from "bs58";
import { useUserState } from "../api/use-user-state";
import toPubString from "@/lib/utils/pub-string";

export function useSignInAction() {
  const { publicKey, signMessage } = useWallet();

  const address = toPubString(publicKey);

  const { trigger: signInApiAction } = useSignIn();

  const { mutate: refreshUserState } = useUserState(address);

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

      await signInApiAction({
        wallet: publicKey.toBase58(),
        signature: signatureStr,
        ts: String(Math.floor(Date.now() / 1000)),
      });

      refreshUserState();

      console.log(signatureStr);
    } catch (error: any) {
      console.log("error", `Sign Message failed! ${error?.message}`);
    }
  }, [publicKey, signMessage, signInApiAction, refreshUserState]);

  return {
    signInAction,
  }
}
