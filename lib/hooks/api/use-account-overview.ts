import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { Paths } from "@/lib/PathMap";
import fetcher from "@/lib/fetcher";
import { useWallet } from "@solana/wallet-adapter-react";
import toPubString from "@/lib/utils/pub-string";

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
