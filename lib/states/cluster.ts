import { atomWithStorage } from "jotai/utils";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import { EndPointPathMap } from "../PathMap";

const MAINNET_RPC_ENDPOINT = "https://api.devnet.solana.com";
// "http://realms-realms-c335.mainnet.rpcpool.com/258d3727-bb96-409d-abea-0b1b4c48af29/";
// "https://api.mainnet-beta.solana.com";
const DEVNET_RPC_ENDPOINT = "https://api.devnet.solana.com";

export enum ClusterType {
  Mainnet,
  Devnet,
}

interface Cluster {
  type: ClusterType;
  connection: Connection;
  endpoint: string;
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
    marketPlace: string;
    usdcTokenMint: string;
    pointTokenMint: string;
    poolUsdcTokenAccount: string;
    poolPointsTokenAccount: string;
    poolTokenAuthority: string;
  };
}

export const MainnetCluster: Cluster = {
  type: ClusterType.Mainnet,
  connection: new Connection(MAINNET_RPC_ENDPOINT, "recent"),
  endpoint: clusterApiUrl("mainnet-beta"),
  network: WalletAdapterNetwork.Mainnet,
  rpcEndpoint: MAINNET_RPC_ENDPOINT,
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
    tadleProgram: "2XcuPc1Ye5EADqYQUWbk8Ce4nUnJNCCaKpPtdBz4RMTZ",
    systemConfig: "EjJiM1bzhjnXrGGkAVxv6vEbAFQk5SPJTzZiZQn1TcxT",
    marketPlace: "AzFbdob6LGXhoudr9cQvmiGJUTAohTPxDdCghUABPXmb",
    usdcTokenMint: "BoXxLrd1FbYj4Dr22B5tNBSP92fiTmFhHEkRAhN2wDxZ",
    pointTokenMint: "23WDf2virf2Ezw9fQs67Pv1DbpoidWFsCxKUyzqdspT3",
    poolUsdcTokenAccount: "HbRitfWjKhgjEzR25ahQU1HEmpebRQruXAPZ5bVVr3xg",
    poolPointsTokenAccount: "CKpVE9Zc1X15BFd1icC4sx75BtiM34oB9rbiyhoDSKAg",
    poolTokenAuthority: "4gsccVybk5sTpXEBPjfbqyzXWMFWRD5xCFnBnn17Euw8",
  },
};

export const DevnetCluster: Cluster = {
  type: ClusterType.Devnet,
  connection: new Connection(DEVNET_RPC_ENDPOINT, "recent"),
  endpoint: clusterApiUrl("devnet"),
  network: WalletAdapterNetwork.Testnet,
  rpcEndpoint: DEVNET_RPC_ENDPOINT,
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
    tadleProgram: "2XcuPc1Ye5EADqYQUWbk8Ce4nUnJNCCaKpPtdBz4RMTZ",
    systemConfig: "EjJiM1bzhjnXrGGkAVxv6vEbAFQk5SPJTzZiZQn1TcxT",
    marketPlace: "AzFbdob6LGXhoudr9cQvmiGJUTAohTPxDdCghUABPXmb",
    usdcTokenMint: "BoXxLrd1FbYj4Dr22B5tNBSP92fiTmFhHEkRAhN2wDxZ",
    pointTokenMint: "23WDf2virf2Ezw9fQs67Pv1DbpoidWFsCxKUyzqdspT3",
    poolUsdcTokenAccount: "HbRitfWjKhgjEzR25ahQU1HEmpebRQruXAPZ5bVVr3xg",
    poolPointsTokenAccount: "CKpVE9Zc1X15BFd1icC4sx75BtiM34oB9rbiyhoDSKAg",
    poolTokenAuthority: "4gsccVybk5sTpXEBPjfbqyzXWMFWRD5xCFnBnn17Euw8",
  },
};

export const ClusterAtom = atomWithStorage<ClusterType>(
  "cluster",
  ClusterType.Mainnet,
);
