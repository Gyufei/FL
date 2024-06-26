import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { Paths } from "@/lib/PathMap";
import fetcher from "@/lib/fetcher";
import { useWallet } from "@solana/wallet-adapter-react";
import toPubString from "@/lib/utils/pub-string";
import useSWRMutation from "swr/mutation";

export function useAccountOverview() {
  const { apiEndPoint } = useEndPoint();
  const { publicKey } = useWallet();
  const wallet = toPubString(publicKey);

  const res = useSWR(
    wallet ? `${apiEndPoint}${Paths.accountOverview}?wallet=${wallet}` : null,
    fetcher,
  );

  return res;
}

export function useUserNameChange() {
  const { apiEndPoint } = useEndPoint();

  const postApi = async (
    _: string,
    {
      arg,
    }: {
      arg: {
        "uuid": string,
        "user_name": string
      };
    },
  ) => {
    if (!arg.uuid || !arg.user_name) return null;

    const res = await fetcher(
      `${apiEndPoint}${Paths.userName}`,
      {
        method: "POST",
        body: JSON.stringify({
          ...arg
        }),
      },
    );

    return res;
  };

  const res = useSWRMutation("update referral notes", postApi);

  return res;
}
