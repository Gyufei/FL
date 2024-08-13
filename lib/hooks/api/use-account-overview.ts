import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { Paths } from "@/lib/PathMap";
import fetcher from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";
import useWalletInfo from "../web3/use-wallet-info";

export function useAccountOverview() {
  const { apiEndPoint } = useEndPoint();
  const { address: wallet } = useWalletInfo();

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
        uuid: string;
        user_name: string;
      };
    },
  ) => {
    if (!arg.uuid || !arg.user_name) return null;

    const res = await fetcher(`${apiEndPoint}${Paths.userName}`, {
      method: "POST",
      body: JSON.stringify({
        ...arg,
      }),
    });

    return res;
  };

  const res = useSWRMutation("update referral notes", postApi);

  return res;
}
