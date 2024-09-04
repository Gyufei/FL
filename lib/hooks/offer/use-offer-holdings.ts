import { IOffer } from "@/lib/types/offer";
import { useMarketHoldings } from "@/lib/hooks/api/use-market-holdings";
import { useMemo } from "react";

export default function useOfferHoldings({ offer }: { offer: IOffer }) {
  const res = useMarketHoldings({
    marketAccount: offer?.market_place_account,
  });

  const offerHoldings = useMemo(() => {
    if (!res.data) return [];

    const oStocks = res.data.filter((s) => s.pre_offer_account === offer.offer_account);

    return oStocks;
  }, [res.data, offer]);

  return {
    ...res,
    data: offerHoldings,
  };
}
