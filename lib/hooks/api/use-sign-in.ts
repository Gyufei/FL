import useSWRMutation from "swr/mutation";
import { useEndPoint } from "./use-endpoint";
import fetcher from "@/lib/fetcher";
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
    );

    return res;
  };

  const res = useSWRMutation("Sign in", LoginFetcher);

  return res;
}
