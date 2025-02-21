import { atomWithStorage } from "jotai/utils";
import { ChainConfigs } from "../const/chain-configs";

export const GlobalRpcsAtom = atomWithStorage<Record<any, any>>(
  "globalRpcsV2",
  {
    monad: ChainConfigs.monad.rpcs.TadleDefaultRPC,
    eth: ChainConfigs.eth.rpcs.TadleDefaultRPC,
    bnb: ChainConfigs.bnb.rpcs.TadleDefaultRPC,
  },
);

export const CustomRpcsAtom = atomWithStorage<Record<any, any>>(
  "customRpcsV2",
  {
    monad: null,
    eth: null,
    bnb: null,
  },
);
