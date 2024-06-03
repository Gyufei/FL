import useSWR from "swr"
import { useEndPoint } from "./use-endpoint";
import fetcher from "@/lib/fetcher";
import { Paths } from "@/lib/PathMap";

export default function useMakerSettleAccount({
  makerId,
  isTurbo
}: {
  makerId: string
  isTurbo: boolean
}) {
  const { apiEndPoint } = useEndPoint();
  
  const MakerAccountFetcher = async () => {
    if (!makerId || !isTurbo ) return null;

    const res = await fetcher(
      `${apiEndPoint}${Paths.makerSettleAccount}?maker_account=${makerId}`,
    );

    return res as any;
  };

  const res = useSWR(`makerSettleAccountId=${makerId}`, MakerAccountFetcher);

  return res
 }
