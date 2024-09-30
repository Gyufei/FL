import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { isProduction } from "../PathMap";

export interface IChainConfig {
  name: string;
  network: string | number;
  alias: string;
  logo: string;
  rpcs: Record<string, string>;
  zeroAddr: string;
  contracts: Record<string, string>;
  isEvm: boolean;
}

export const ChainConfigs: Record<string, IChainConfig> = {
  solana: {
    name: "Solana",
    alias: "solana",
    logo: "/icons/solana.svg",
    rpcs: {
      TadleRPC1:
        process.env.NEXT_PUBLIC_DEFAULT_RPC_SOLANA ||
        "https://rpc.ankr.com/solana",
      TadleDevRPC1: "https://rpc.ankr.com/solana_devnet",
      solanaDevnet: "https://api.devnet.solana.com/",
      solanaTestnet: "https://api.testnet.solana.com/",
    },
    zeroAddr: "11111111111111111111111111111111",
    network: isProduction
      ? WalletAdapterNetwork.Mainnet
      : WalletAdapterNetwork.Devnet,
    contracts: isProduction
      ? {
          // prod
          usdcTokenMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          projectTokenMint: "23WDf2virf2Ezw9fQs67Pv1DbpoidWFsCxKUyzqdspT3",
          tadleProgram: "TADLEyeCY4UfTtMgGJqHi74w4Zs8KqpjyLceqQCfGRj",
        }
      : {
          // test
          usdcTokenMint: "BoXxLrd1FbYj4Dr22B5tNBSP92fiTmFhHEkRAhN2wDxZ",
          projectTokenMint: "23WDf2virf2Ezw9fQs67Pv1DbpoidWFsCxKUyzqdspT3",
          tadleProgram: "V2hUyeFz8NwR6QXYxFo3ixJNK5GtFvTGSifsM2RCwEJ",
        },
    isEvm: false,
  },
  eth: {
    name: "Ethereum",
    alias: "eth",
    logo: "/icons/eth.svg",
    zeroAddr: "0x0000000000000000000000000000000000000000",
    network: isProduction ? 1 : 1337,
    rpcs: {
      TadleRPC1:
        process.env.NEXT_PUBLIC_DEFAULT_RPC_ETH || "https://rpc.ankr.com/eth",
      TadleDevRPC1: "https://devnet-rpc.aggregation.top/",
    },
    contracts: isProduction
      ? {
          // prod
          preMarkets: "0xa853BE4931401059Dce7146b28aC4A190f108354",
          tokenManager: "0xa921e0BA08ceA8850D82D5e8240f626777FC1dB9",
          systemConfig: "0xa026b4E35AAE30f7CC5F0a205D49b8A38d1B65Aa",
          deliveryPlace: "0x384124A2588a8a446873a34c0FdFfE7f30FfE70F",
        }
      : {
          // test
          preMarkets: "0x350a46b98259730aDb72dbC1Af3D892A43F60953",
          tokenManager: "0xb32C57B4718D744e7DB5440395302a9bAF871A40",
          systemConfig: "0xd4e1c4aFfB64957076304FF140d1ad4F07250fBb",
          deliveryPlace: "0xFbbB0159dc92273503f93A59fE1140f66A021510",
        },
    isEvm: true,
  },
  bsc: {
    name: "BNB Chain",
    alias: "bsc",
    logo: "/icons/bsc.svg",
    zeroAddr: "0x0000000000000000000000000000000000000000",
    network: isProduction ? 56 : 97,
    rpcs: {
      TadleRPC1:
        process.env.NEXT_PUBLIC_DEFAULT_RPC_BSC || "https://rpc.ankr.com/bsc",
      TadleDevRPC1: "https://rpc.ankr.com/bsc_testnet_chapel",
    },
    contracts: isProduction
      ? {
          preMarkets: "0xa853BE4931401059Dce7146b28aC4A190f108354",
          tokenManager: "0xa921e0BA08ceA8850D82D5e8240f626777FC1dB9",
          systemConfig: "0xa026b4E35AAE30f7CC5F0a205D49b8A38d1B65Aa",
          deliveryPlace: "0x384124A2588a8a446873a34c0FdFfE7f30FfE70F",
        }
      : {
          preMarkets: "0xa853BE4931401059Dce7146b28aC4A190f108354",
          tokenManager: "0xa921e0BA08ceA8850D82D5e8240f626777FC1dB9",
          systemConfig: "0xa026b4E35AAE30f7CC5F0a205D49b8A38d1B65Aa",
          deliveryPlace: "0x384124A2588a8a446873a34c0FdFfE7f30FfE70F",
        },
    isEvm: true,
  },
};
