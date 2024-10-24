import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { DataApiPaths } from "@/lib/PathMap";
import fetcher from "@/lib/fetcher";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";

export function useUserXp() {
  const { dataApiEndPoint: apiEndPoint } = useEndPoint();
  const { address: wallet } = useChainWallet();

  const res = useSWR<any>(
    wallet ? `${apiEndPoint}${DataApiPaths.userXP}/${wallet}` : null,
    fetcher,
  );

  return res;
}
