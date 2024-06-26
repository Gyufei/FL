import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { Paths } from "@/lib/PathMap";
import fetcher from "@/lib/fetcher";
import { useWallet } from "@solana/wallet-adapter-react";
import toPubString from "@/lib/utils/pub-string";

export function useUserXp() {
  const { apiEndPoint } = useEndPoint();
  const { publicKey } = useWallet();
  const wallet = toPubString(publicKey);

  const res = useSWR<any>(
    wallet ? `${apiEndPoint}${Paths.userXpPoints}?wallet=${wallet}`: null,
    fetcher,
  );

  return res;
}
