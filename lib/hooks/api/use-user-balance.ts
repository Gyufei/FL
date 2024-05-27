import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { Paths } from "@/lib/PathMap";
import fetcher from "@/lib/fetcher";

export interface IBalance {
    point_token_balance_list: IPointBalance[];
    token_balance_list: ITokenBalance[];
}

export interface IPointBalance {
  realized_assets: string;
  token_address: string;
}

export interface ITokenBalance {
  maker_refund: string;
  referral_bonus: string;
  remaining_cash: string;
  sales_revenue: string;
  tax_income: string;
  token_address: string;
}

export function useUserBalance(wallet: string) {
  const { apiEndPoint } = useEndPoint();

  const res = useSWR<IBalance>(
    wallet ? `${apiEndPoint}${Paths.userBalance}?wallet=${wallet}`: null,
    fetcher,
  );

  return res;
}
