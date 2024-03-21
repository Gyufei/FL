import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Paths } from "@/lib/PathMap";

import { useEndPoint } from "./use-endpoint";
import { IMakerDetail } from "@/lib/types/maker-detail";

export function useMakerDetail({ makerId }: { makerId: string }) {
  const { apiEndPoint } = useEndPoint();

  const MakerFetcher = async () => {
    if (!makerId) return null;

    const res = await fetcher(
      `${apiEndPoint}${Paths.makerDetail}?maker_id=${makerId}`,
    );

    return res as IMakerDetail;
  };

  const res = useSWR(`makerId=${makerId}`, MakerFetcher);

  return res;
}
