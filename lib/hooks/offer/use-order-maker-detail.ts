import { IOffer } from "@/lib/types/order";
import { useMakerDetail } from "../api/use-maker-detail";

export function useOrderMakerDetail({ order }: { order: IOffer }) {
  const { data: makerDetail } = useMakerDetail({
    makerId: order.maker_account,
  });

  const { data: preOrderMakerDetail } = useMakerDetail({
    makerId: order.preOrderDetail?.maker_account || "",
  });

  return {
    makerDetail,
    preOrderMakerDetail,
  };
}
