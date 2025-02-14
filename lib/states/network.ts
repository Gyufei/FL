import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export enum ENetworks {
  Eth,
  Bnb,
}
export const NetworkAtom = atomWithStorage<ENetworks>(
  "network",
  ENetworks.Eth,
  undefined,
  {
    getOnInit: true,
  },
);
export const IsEthAtom = atom((get) => get(NetworkAtom) === ENetworks.Eth);
export const isBscAtom = atom((get) => get(NetworkAtom) === ENetworks.Bnb);
