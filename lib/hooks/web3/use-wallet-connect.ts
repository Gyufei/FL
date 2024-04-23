import { useWallet } from "@solana/wallet-adapter-react";

export function useWalletConnect() {
  const { connected } = useWallet();

  return {
    connected
  }
}
