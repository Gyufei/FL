import { atom, createStore } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const UserStore = createStore();
export const ShowSignDialogAtom = atom(false);

export const AccessTokenAtom = atomWithStorage<string>("access_token", "");
