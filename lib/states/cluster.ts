import { atomWithStorage } from "jotai/utils";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { EndPointPathMap, isPreview } from "../PathMap";

export const RPCS = {
  solanaFm: process.env.NEXT_PUBLIC_DEFAULT_RPC_SOLANA || "https://rpc.ankr.com/solana",
  solanaFmDevnet: "https://rpc.ankr.com/solana_devnet",
  solanaDevnet: "https://api.devnet.solana.com/",
  solanaTestnet: "https://api.testnet.solana.com/",
};

interface Cluster {
  network: WalletAdapterNetwork;
  api: {
    default: string;
    tokenApi: string;
  };
  marginTokens: Array<string>;
  program: {
    tadleProgram: string;
    systemConfig: string;
    usdcTokenMint: string;
    pointTokenMint: string;
    poolUsdcTokenAccount: string;
    poolPointsTokenAccount: string;
    poolTokenAuthority: string;
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
  api: {
    default: EndPointPathMap.solanaApi,
    tokenApi: EndPointPathMap.solanaToken,
  },
  marginTokens: [
    "0xd2bB751e65fD6DBb224872ED7Df807f29b0F98aa",
    "0x7BdabA369F4554A4F3b39AF031C9D8355BBa6161",
  ],
  program: {
    usdcTokenMint: "BoXxLrd1FbYj4Dr22B5tNBSP92fiTmFhHEkRAhN2wDxZ",
    pointTokenMint: "23WDf2virf2Ezw9fQs67Pv1DbpoidWFsCxKUyzqdspT3",
    tadleProgram: "V2hUyeFz8NwR6QXYxFo3ixJNK5GtFvTGSifsM2RCwEJ",
    systemConfig: "AprdBYPGob4ksDpwznizN2kFv4Lke5fUMMgk1z5tk2JC",
    poolUsdcTokenAccount: "Ek6abmfsBSJXe3UtgtuvK55X9hwYFiaZYJ3bfb5vMRxw",
    poolPointsTokenAccount: "72ruiQSFdGYroAq9NVYqGtDK7gLAdqzC59SSAnGzxyDN",
    poolTokenAuthority: "6pQTnaaEK5PHREyBdBDVYyCwPdxviYsQpoDaUoFTxfnZ",
  },
};

export const DevnetCluster: Cluster = {
  network: WalletAdapterNetwork.Devnet,
  api: {
    default: EndPointPathMap.solanaApi,
    tokenApi: EndPointPathMap.solanaToken,
  },
  marginTokens: [
    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
  ],
  program: {
    usdcTokenMint: "BoXxLrd1FbYj4Dr22B5tNBSP92fiTmFhHEkRAhN2wDxZ",
    pointTokenMint: "23WDf2virf2Ezw9fQs67Pv1DbpoidWFsCxKUyzqdspT3",
    tadleProgram: "V2hUyeFz8NwR6QXYxFo3ixJNK5GtFvTGSifsM2RCwEJ",
    systemConfig: "DaXU1tqtLtgP5P6XSZd48PrPX9WJ3wf2h5CBHuhZ92Y7",
    poolUsdcTokenAccount: "Ek6abmfsBSJXe3UtgtuvK55X9hwYFiaZYJ3bfb5vMRxw",
    poolPointsTokenAccount: "72ruiQSFdGYroAq9NVYqGtDK7gLAdqzC59SSAnGzxyDN",
    poolTokenAuthority: "2vWanJd4SnhiRtK9tuyqshmPdLEafgnUeHSNFnTHVi31",
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
  [WalletAdapterNetwork.Mainnet]: RPCS.solanaFm,
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
