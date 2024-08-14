import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { Paths } from "@/lib/PathMap";
import fetcher from "@/lib/fetcher";
import { useChainWallet } from "../web3/use-chain-wallet";

export function useUserXp() {
  const { apiEndPoint } = useEndPoint();
  const { address: wallet } = useChainWallet();

  const res = useSWR<any>(
    wallet ? `${apiEndPoint}${Paths.userXpPoints}?wallet=${wallet}` : null,
    fetcher,
  );

  return res;
}
