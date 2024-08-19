import { atomWithStorage } from "jotai/utils";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { RPCS } from "../const/solana";

export const GlobalRpcsAtom = atomWithStorage<
  Record<WalletAdapterNetwork, string | null>
>("gRpc", {
  [WalletAdapterNetwork.Mainnet]: RPCS.TadleRPC1,
  [WalletAdapterNetwork.Devnet]: RPCS.solanaDevnet,
  [WalletAdapterNetwork.Testnet]: RPCS.solanaTestnet,
});

export const CustomRpcsAtom = atomWithStorage<
  Record<WalletAdapterNetwork, string | null>
>("cRpc", {
  [WalletAdapterNetwork.Mainnet]: null,
  [WalletAdapterNetwork.Devnet]: null,
  [WalletAdapterNetwork.Testnet]: null,
});
