import { cookieStorage, createStorage, http } from "wagmi";
import { mainnet, bsc, bscTestnet } from "wagmi/chains";
import { testnet } from "./testnet";
import { isProduction } from "@/lib/PathMap";
import { createConfig } from "@privy-io/wagmi";

const chains = isProduction
  ? ([mainnet, bsc] as const)
  : ([mainnet, bsc, bscTestnet, testnet] as const);

export function getEvmWagmiConfig({
  ethRpc,
  bscRpc,
}: {
  ethRpc: string;
  bscRpc: string;
}) {
  const transports = isProduction
    ? {
        [mainnet.id]: http(ethRpc),
        [bsc.id]: http(bscRpc),
      }
    : {
        [bscTestnet.id]: http(bscRpc),
        [testnet.id]: http(),
      };

  return createConfig({
    chains,
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
    transports: transports as any,
  });
}
