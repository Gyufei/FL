import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { Paths } from "@/lib/PathMap";
import fetcher from "@/lib/fetcher";

export interface ITokenBalance {
  token_addr: string;
  withdrawable: string;

  ledgers: {
    maker_refund: string;
    referral_bonus: string;
    remaining_cash: string;
    sales_revenue: string;
    tax_income: string;
    settlement: number;
  };
}

export function useUserTokenBalance(wallet: string) {
  const { apiEndPoint } = useEndPoint();

  const res = useSWR<Array<ITokenBalance>>(
    wallet ? `${apiEndPoint}${Paths.userTokenBalance}/${wallet}` : null,
    fetcher,
  );

  return res;
}
