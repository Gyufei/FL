import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { Paths } from "@/lib/PathMap";
import fetcher from "@/lib/fetcher";
import useWalletInfo from "../web3/use-wallet-info";

export function useUserXp() {
  const { apiEndPoint } = useEndPoint();
  const { address: wallet } = useWalletInfo();

  const res = useSWR<any>(
    wallet ? `${apiEndPoint}${Paths.userXpPoints}?wallet=${wallet}` : null,
    fetcher,
  );

  return res;
}
