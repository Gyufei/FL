import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export enum ENetworks {
  Solana,
  Eth,
}
export const NetworkAtom = atomWithStorage<ENetworks>(
  "network",
  ENetworks.Solana,
  undefined,
  {
    unstable_getOnInit: true,
  },
);
export const IsEthAtom = atom((get) => get(NetworkAtom) === ENetworks.Eth);
export const IsSolanaAtom = atom(
  (get) => get(NetworkAtom) === ENetworks.Solana,
);
