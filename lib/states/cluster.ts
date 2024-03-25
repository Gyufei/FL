import { atomWithStorage } from "jotai/utils";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { EndPointPathMap } from "../PathMap";

export const RPCS = {
  solanaFm: "https://solana-api.solana.fm/",
  solanaFmDevnet: "https://solana-api.solana.fm/?network=devnet",
  solanaDevnet: "https://api.devnet.solana.com/",
  solanaTestnet: "https://api.testnet.solana.com/",
};

interface Cluster {
  network: WalletAdapterNetwork;
  rpcEndpoint: string;
  customRpcEndPoint: string | null;
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
  };
}

export const MainnetCluster: Cluster = {
  network: WalletAdapterNetwork.Mainnet,
  rpcEndpoint: RPCS.solanaFm,
  customRpcEndPoint: null,
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
    tadleProgram: "J6Xk8q8iptHy1XaAkJN58GrspUd97GyAhkbQMc1XN37Y",
    systemConfig: "BnshNkBtATQTENqGJaqaXdMRoegVavKNZx19aqkM9Qb5",
    poolUsdcTokenAccount: "95g3V9HsuyMG2Z7MvaaZA1q1ysVMpENYtJZBwA7MLQgT",
    poolPointsTokenAccount: "2RsKJTmhQVYmR87PaV9MdDuHVNyrKZoX1XWyT5kWZBFr",
    poolTokenAuthority: "AjUtp2QB4VdjGVzSCjZCrKGXTryBS64jncvbceF4TzM4",
  },
};

export const DevnetCluster: Cluster = {
  network: WalletAdapterNetwork.Testnet,
  rpcEndpoint: RPCS.solanaFmDevnet,
  customRpcEndPoint: null,
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
    tadleProgram: "J6Xk8q8iptHy1XaAkJN58GrspUd97GyAhkbQMc1XN37Y",
    systemConfig: "BnshNkBtATQTENqGJaqaXdMRoegVavKNZx19aqkM9Qb5",
    poolUsdcTokenAccount: "95g3V9HsuyMG2Z7MvaaZA1q1ysVMpENYtJZBwA7MLQgT",
    poolPointsTokenAccount: "2RsKJTmhQVYmR87PaV9MdDuHVNyrKZoX1XWyT5kWZBFr",
    poolTokenAuthority: "AjUtp2QB4VdjGVzSCjZCrKGXTryBS64jncvbceF4TzM4",
  },
};

export const ClusterAtom = atomWithStorage<WalletAdapterNetwork>(
  "cluster",
  WalletAdapterNetwork.Mainnet,
);

export const CustomRpcsAtom = atomWithStorage<
  Record<WalletAdapterNetwork, string | null>
>("rpc", {
  [WalletAdapterNetwork.Mainnet]: null,
  [WalletAdapterNetwork.Devnet]: null,
  [WalletAdapterNetwork.Testnet]: null,
});
