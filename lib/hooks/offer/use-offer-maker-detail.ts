import { IOffer } from "@/lib/types/order";
import { useMakerDetail } from "../api/use-maker-detail";
import { useMemo } from "react";
import { useOfferTree } from "./use-offer-tree";

export function useOfferMakerDetail({ offer }: { offer: IOffer }) {
  const { getOriginOrder } = useOfferTree();

  const { data: makerDetail } = useMakerDetail({
    makerId: offer.maker_account,
  });


  const originOrder = useMemo(() => {
    return getOriginOrder(offer);
  }, [offer, getOriginOrder]);

  const { data: originOfferMakerDetail } = useMakerDetail({
    makerId: originOrder?.maker_account || "",
  });

  return {
    originOrder,
    makerDetail,
    originOfferMakerDetail,
  };
}
