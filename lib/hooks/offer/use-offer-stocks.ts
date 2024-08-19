import { IOffer } from "@/lib/types/offer";
import { useMarketStocks } from "@/lib/hooks/api/use-market-stocks";
import { useMemo } from "react";

export default function useOfferStocks({
  offer
}: {
  offer: IOffer
}) {
  const res = useMarketStocks({
    marketAccount: offer?.market_place_account
  })

  const offerStocks = useMemo(() => {
    if (!res.data) return [];

    const oStocks = res.data.filter(s => s.pre_offer === offer.offer_account);

    return oStocks;
  }, [res.data, offer])

  return {
    ...res,
    data: offerStocks,
  }
}
