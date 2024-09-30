import { atomWithStorage } from "jotai/utils";
import { ChainConfigs } from "../const/chain-config";

export const GlobalRpcsAtom = atomWithStorage<Record<any, any>>(
  "globalRpcsV2",
  {
    eth: ChainConfigs.eth.rpcs.TadleRPC1,
    bsc: ChainConfigs.bsc.rpcs.TadleRPC1,
    solana: ChainConfigs.solana.rpcs.TadleRPC1,
  },
);

export const CustomRpcsAtom = atomWithStorage<Record<any, any>>(
  "customRpcsV2",
  {
    eth: null,
    bsc: null,
    solana: null,
  },
);
