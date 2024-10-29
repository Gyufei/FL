import { cookieStorage, createStorage, http } from "wagmi";
import { mainnet, bsc, bscTestnet, sepolia } from "wagmi/chains";
import { testnet } from "./testnet";
import { isProduction } from "@/lib/PathMap";
import { createConfig } from "@privy-io/wagmi";

export const supportedChains = isProduction
  ? ([mainnet, bsc] as const)
  : ([mainnet, bsc, sepolia, testnet, bscTestnet] as const);

export function getEvmWagmiConfig({
  ethRpc,
  bnbRpc,
}: {
  ethRpc: string;
  bnbRpc: string;
}) {
  const transports = isProduction
    ? {
        [mainnet.id]: http(ethRpc),
        [bsc.id]: http(bnbRpc),
      }
    : {
        [bscTestnet.id]: http(bnbRpc),
        [sepolia.id]: http(),
        [testnet.id]: http(),
      };

  return createConfig({
    chains: supportedChains,
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
    transports: transports as any,
  });
}
