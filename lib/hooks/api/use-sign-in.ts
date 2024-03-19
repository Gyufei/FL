import useSWRMutation from "swr/mutation";
import { useEndPoint } from "./use-endpoint";
import fetcher from "@/lib/fetcher";
import { useEffect } from "react";
import { AccessTokenAtom, UserStore } from "@/lib/states/user";
import { Paths } from "@/lib/PathMap";

export function useSignIn() {
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
      UserStore.set(AccessTokenAtom, res.data.access_token);
    }
  }, [res.data]);

  return res;
}
