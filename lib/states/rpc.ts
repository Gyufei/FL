import { atomWithStorage } from "jotai/utils";
import { ChainConfigs } from "../const/chain-config";

export const GlobalRpcsAtom = atomWithStorage<Record<any, any>>(
  "globalRpcsV2",
  {
    eth: ChainConfigs.eth.rpcs.TadleDefaultRPC,
    bnb: ChainConfigs.bnb.rpcs.TadleDefaultRPC,
    solana: ChainConfigs.solana.rpcs.TadleDefaultRPC,
  },
);

export const CustomRpcsAtom = atomWithStorage<Record<any, any>>(
  "customRpcsV2",
  {
    eth: null,
    bnb: null,
    solana: null,
  },
);
