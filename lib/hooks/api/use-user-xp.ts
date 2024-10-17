import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { Paths } from "@/lib/PathMap";
import fetcher from "@/lib/fetcher";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";

export function useUserXp() {
  const { apiEndPoint } = useEndPoint();
  const { address: wallet } = useChainWallet();

  const res = useSWR<any>(
    wallet ? `${apiEndPoint}${Paths.userXP}/${wallet}` : null,
    fetcher,
  );

  return res;
}
