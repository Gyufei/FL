import { atomWithStorage } from "jotai/utils";

export enum ENetworks {
  Solana,
  Eth,
}
export const NetworkAtom = atomWithStorage<ENetworks>(
  "network",
  ENetworks.Solana,
);
