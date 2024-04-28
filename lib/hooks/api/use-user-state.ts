import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { Paths } from "@/lib/PathMap";
import fetcher from "@/lib/fetcher";

import { useEffect } from "react";
import { AccessTokenAtom, ShowSignDialogAtom } from "@/lib/states/user";
import { useSetAtom } from "jotai";

export function useUserState(wallet: string) {
  const { apiEndPoint } = useEndPoint();

  const setToken = useSetAtom(AccessTokenAtom);
  const setShowSignInDialog = useSetAtom(ShowSignDialogAtom);

  const res = useSWR(
    wallet ? `${apiEndPoint}${Paths.userState}?wallet=${wallet}` : null,
    fetcher,
  );

  useEffect(() => {
    if (res.data?.access_token) {
      setToken(res.data.access_token);
    }

    if (res.data?.is_sign_in) {
      setShowSignInDialog(false);
    }
  }, [res.data]);

  return res;
}
