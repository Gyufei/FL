import { useWallet } from "@solana/wallet-adapter-react";
import base58 from "bs58";
import { useCallback } from "react";

export function SignInBtn() {
  const { publicKey, signMessage } = useWallet();

  const onClick = useCallback(async () => {
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

      console.log(signatureStr);
    } catch (error: any) {
      console.log("error", `Sign Message failed! ${error?.message}`);
    }
  }, [publicKey, signMessage]);

  return (
    <div className="mt-5 w-full">
      <button
        onClick={onClick}
        className="flex h-12 w-full items-center justify-center rounded-2xl bg-yellow text-black"
      >
        Sign in
      </button>
    </div>
  );
}
