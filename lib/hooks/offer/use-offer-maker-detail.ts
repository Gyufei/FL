import { IOffer } from "@/lib/types/offer";
import { useMakerDetail } from "../api/use-maker-detail";
import { useMemo } from "react";
import { IStock } from "@/lib/types/stock";

export function useOfferMakerDetail({ offer }: { offer: IOffer | IStock }) {
  const { data: makerDetail } = useMakerDetail({
    makerId: offer.maker_account,
  });

  const originOffer = useMemo(() => {
    return (offer as any).origin_offer_detail
  }, [offer]);

  const { data: originOfferMakerDetail } = useMakerDetail({
    makerId: originOffer?.maker_account || "",
  });

  return {
    originOffer,
    makerDetail,
    originOfferMakerDetail,
  };
}
