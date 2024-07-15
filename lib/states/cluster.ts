import { atomWithStorage } from "jotai/utils";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { isPreview } from "../PathMap";

export const RPCS = {
  TadleRPC1: process.env.NEXT_PUBLIC_DEFAULT_RPC_SOLANA || "https://rpc.ankr.com/solana",
  TadleDevRPC1: "https://rpc.ankr.com/solana_devnet",
  solanaDevnet: "https://api.devnet.solana.com/",
  solanaTestnet: "https://api.testnet.solana.com/",
};

interface Cluster {
  network: WalletAdapterNetwork;
  // marginTokens: Array<string>;
  program: {
    tadleProgram: string;
    usdcTokenMint: string;
    pointTokenMint: string;
    faucet?: {
      tadleFaucet: string;
      systemConfig: string;
      poolTokenAuthority: string;
      poolTokenAccount: string;
    }
  };
}

export const MainnetCluster: Cluster = {
  network: WalletAdapterNetwork.Mainnet,
  program: {
    usdcTokenMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    pointTokenMint: "23WDf2virf2Ezw9fQs67Pv1DbpoidWFsCxKUyzqdspT3",
    tadleProgram: "TADLEyeCY4UfTtMgGJqHi74w4Zs8KqpjyLceqQCfGRj",
  },
};

export const DevnetCluster: Cluster = {
  network: WalletAdapterNetwork.Devnet,
  program: {
    usdcTokenMint: "BoXxLrd1FbYj4Dr22B5tNBSP92fiTmFhHEkRAhN2wDxZ",
    pointTokenMint: "23WDf2virf2Ezw9fQs67Pv1DbpoidWFsCxKUyzqdspT3",
    tadleProgram: "V2hUyeFz8NwR6QXYxFo3ixJNK5GtFvTGSifsM2RCwEJ",
    faucet: {
      tadleFaucet: '8F8Ygn7aHZ7tNtn4WzEfsQLporeG2ppwkBQRrK15LdqZ',
      systemConfig: '5v4PUXM3FSitkMACQ3GsCZhqHEYdgceDkg6gE8xeJuBj',
      poolTokenAuthority: '3ZrCod6LDxX9VDdf1uRsb2KcfYj6CTLBA2gDn7MSkHiL',
      poolTokenAccount: 'Fn7BKg1LJLxJ55aDSCvtRZHehdx8tEzo5D6CfkJtzJRC',
    }
  },
};

export const ClusterAtom = atomWithStorage<WalletAdapterNetwork>(
  "cluster",
  isPreview ? WalletAdapterNetwork.Devnet : WalletAdapterNetwork.Mainnet,
);

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
