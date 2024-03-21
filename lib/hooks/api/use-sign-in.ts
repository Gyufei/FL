import useSWRMutation from "swr/mutation";
import { useEndPoint } from "./use-endpoint";
import fetcher from "@/lib/fetcher";
import { useEffect } from "react";
import { AccessTokenAtom, ShowSignAtom } from "@/lib/states/user";
import { Paths } from "@/lib/PathMap";
import { useSetAtom } from "jotai";

export function useSignIn() {
  const setToken = useSetAtom(AccessTokenAtom);
  const setSignIn = useSetAtom(ShowSignAtom);

  const { apiEndPoint } = useEndPoint();

  const LoginFetcher = async (
    _: string,
    {
      arg,
    }: {
      arg: {
        wallet: string;
        signature: string;
        ts: string;
      };
    },
  ) => {
    const res = await fetcher(
      `${apiEndPoint}${Paths.signIn}?apipost_id=7fff52`,
      {
        method: "POST",
        body: JSON.stringify(arg),
      },
      true,
    );

    return res;
  };

  const res = useSWRMutation("Sign in", LoginFetcher);

  useEffect(() => {
    if (res.data) {
      setToken(res.data.access_token);
      setSignIn(false);
    }
  }, [res.data]);

  return res;
}
