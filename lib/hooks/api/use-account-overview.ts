import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";
import { useEndPoint } from "./use-endpoint";
import { Paths } from "@/lib/PathMap";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";

interface IAccountInfo {
  uid: number;
  user_name: string;
  maker_orders: number;
  taker_orders: number;
  settled_value: string;
  tax_income: string;
  trade_vol: string;
}

export function useAccountStats() {
  const { apiEndPoint } = useEndPoint();
  const { address: wallet } = useChainWallet();

  const res = useSWR<IAccountInfo>(
    wallet ? `${apiEndPoint}${Paths.accountStats}/${wallet}` : null,
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
