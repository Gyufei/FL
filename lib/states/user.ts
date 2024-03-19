import { createStore } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const AccessTokenAtom = atomWithStorage<string>("access_token", "");

export const UserStore = createStore();

UserStore.sub(AccessTokenAtom, () => {});
