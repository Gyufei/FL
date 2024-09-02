import { atomWithStorage } from "jotai/utils";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { SolanaRPCS } from "../const/solana";
import { EthConfig, EthRPCS, EthTestConfig } from "../const/eth";

export const GlobalRpcsAtom = atomWithStorage<Record<any, any>>("globalRpcs", {
  eth: {
    [EthConfig.id]: EthRPCS.TadleRPC1,
    [EthTestConfig.id]: EthRPCS.TadleDevRPC1,
  },
  solana: {
    [WalletAdapterNetwork.Mainnet]: SolanaRPCS.TadleRPC1,
    [WalletAdapterNetwork.Devnet]: SolanaRPCS.solanaDevnet,
    [WalletAdapterNetwork.Testnet]: SolanaRPCS.solanaTestnet,
  },
});

export const CustomRpcsAtom = atomWithStorage<Record<any, any>>("customRpcs", {
  eth: {
    [EthConfig.id]: null,
    [EthTestConfig.id]: null,
  },
  solana: {
    [WalletAdapterNetwork.Mainnet]: null,
    [WalletAdapterNetwork.Devnet]: null,
    [WalletAdapterNetwork.Testnet]: null
  },
});
