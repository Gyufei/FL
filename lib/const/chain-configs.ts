import { isProduction } from "../PathMap";
import { ChainType } from "../types/chain";

export interface IChainConfig {
  name: string;
  network: string | number;
  logo: string;
  rpcs: Record<string, string>;
  zeroAddr: string;
  contracts: Record<string, string>;
  isEvm: boolean;
  chainType: ChainType;
}

export const ChainConfigs: Record<string, IChainConfig> = {
  [ChainType.MONAD]: {
    name: "Monad Testnet",
    chainType: ChainType.MONAD,
    logo: "/icons/monad.svg",
    zeroAddr: "0x0000000000000000000000000000000000000000",
    network: isProduction ? 10143 : 10143,
    rpcs: {
      TadleDefaultRPC: isProduction
        ? process.env.NEXT_PUBLIC_DEFAULT_RPC_MON ||
          "https://monad-testnet.g.alchemy.com/v2/tptPHIbLlR8JoWvmTnw3iDrz4BKJFKjd"
        : "https://monad-testnet.g.alchemy.com/v2/tptPHIbLlR8JoWvmTnw3iDrz4BKJFKjd",
    },
    contracts: isProduction
      ? {
          preMarkets: "0x079f5217C6B8C765FD3b889E87F1a6aa79a6e537",
          tokenManager: "0x0091E1b230bAb4A7FD6b7Bee8722E18FD7770Cfb",
          systemConfig: "0xe4478D8085Fad0E0119060f89Fd27b0e6eBbf1C6",
          deliveryPlace: "0xb876426C57420828ba02c17006BdeA0F181b3ec5",
        }
      : {
          preMarkets: "0x079f5217C6B8C765FD3b889E87F1a6aa79a6e537",
          tokenManager: "0x0091E1b230bAb4A7FD6b7Bee8722E18FD7770Cfb",
          systemConfig: "0xe4478D8085Fad0E0119060f89Fd27b0e6eBbf1C6",
          deliveryPlace: "0xb876426C57420828ba02c17006BdeA0F181b3ec5",
        },
    isEvm: true,
  },
  [ChainType.ETH]: {
    name: "Ethereum",
    chainType: ChainType.ETH,
    logo: "/icons/eth.svg",
    zeroAddr: "0x0000000000000000000000000000000000000000",
    network: isProduction ? 1 : 11155111,
    rpcs: {
      TadleDefaultRPC: isProduction
        ? process.env.NEXT_PUBLIC_DEFAULT_RPC_ETH || "https://rpc.ankr.com/eth"
        : "https://rpc.ankr.com/eth_sepolia",
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
          preMarkets: "0x5b61d7E49B77fA2F62F553C47e9e88223147DD30",
          tokenManager: "0x87f25fe11280c82aEf7247157A06525Cff7A13e5",
          systemConfig: "0xf29140CEE701A202215CC59800Ddd9a4382eD20f",
          deliveryPlace: "0x30681E123b2eC25157f52f3d52baB1EBD8fb5450",
        },
    isEvm: true,
  },
  [ChainType.BNB]: {
    name: "BNB Chain",
    chainType: ChainType.BNB,
    logo: "/icons/bnb.svg",
    zeroAddr: "0x0000000000000000000000000000000000000000",
    network: isProduction ? 56 : 97,
    rpcs: {
      TadleDefaultRPC: isProduction
        ? process.env.NEXT_PUBLIC_DEFAULT_RPC_BSC || "https://rpc.ankr.com/bsc"
        : "https://rpc.ankr.com/bsc_testnet_chapel",
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
          tokenManager: "0x8146e3d854BdC8BdC7c054DCAeC94B7AFa6438A3",
          systemConfig: "0xa026b4E35AAE30f7CC5F0a205D49b8A38d1B65Aa",
          deliveryPlace: "0x384124A2588a8a446873a34c0FdFfE7f30FfE70F",
        },
    isEvm: true,
  },
};
