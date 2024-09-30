import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export enum ENetworks {
  Solana,
  Eth,
  Bsc,
}
export const NetworkAtom = atomWithStorage<ENetworks>(
  "network",
  ENetworks.Solana,
  undefined,
  {
    getOnInit: true,
  },
);
export const IsEthAtom = atom((get) => get(NetworkAtom) === ENetworks.Eth);
export const isBscAtom = atom((get) => get(NetworkAtom) === ENetworks.Bsc);
export const IsSolanaAtom = atom(
  (get) => get(NetworkAtom) === ENetworks.Solana,
);
