import { useAtomValue } from "jotai";
import { useEndPoint } from "./use-endpoint";
import { AccessTokenAtom } from "@/lib/states/user";
import useSWR from "swr";
import { DataApiPaths } from "@/lib/PathMap";
import fetcher from "@/lib/fetcher";

export interface IReferralItem {
  id: string;
  authority_rate: string;
  commission: string;
  flag: string;
  last_commission: string;
  last_referral_users: string;
  notes: string;
  referral_code: string;
  referral_users: string;
  referrer_rate: string;
  trading_fee: string;
  trading_users: string;
  unique_views: string;
}

export function useReferralData() {
  const { dataApiEndPoint: apiEndPoint } = useEndPoint();
  const token = useAtomValue(AccessTokenAtom);

  const referralDataFetcher = async () => {
    if (!token) return null;

    const res = await fetcher(
      `${apiEndPoint}${DataApiPaths.referral.data}?access_token=${token}`,
    )

    const parsedRes = res.map((item: any) => {
      return {
        ...item,
        id: item.referral_code,
      }
    })

    return parsedRes as Array<IReferralItem>;
  }

  const res = useSWR<IReferralItem[] | null>(
    `${token}-referral-data`,
    referralDataFetcher,
  );

  return res;
}

export function useReferralReferer() {
  const { dataApiEndPoint: apiEndPoint } = useEndPoint();
  const token = useAtomValue(AccessTokenAtom);

  const res = useSWR<string | any | null>(
    token ? `${apiEndPoint}${DataApiPaths.referral.referer}?access_token=${token}` : null,
    fetcher,
  );

  if (res.data && res.data?.code === 500) {
    return {
      ...res,
      data: undefined,
    }
  }

  return res;
}

export function useReferralCodeData({ code }: { code: string}) {
  const { dataApiEndPoint: apiEndPoint } = useEndPoint();

  const res = useSWR<{
    authority: string;
    authority_rate: string;
    referral_rate: string
  } | null>(
    code ? `${apiEndPoint}${DataApiPaths.referral.codeData}?referral_code=${code}` : null,
    fetcher,
  );

  return res;
}

export function useReferralExtraRate() {
  const { dataApiEndPoint: apiEndPoint } = useEndPoint();
  const token = useAtomValue(AccessTokenAtom);

  const res = useSWR(
    token ? `${apiEndPoint}${DataApiPaths.referral.extraRate}?access_token=${token}` : null,
    fetcher,
  );

  return res;
}
