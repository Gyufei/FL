import { IOrder } from "@/lib/types/order";
import { useMakerDetail } from "../api/use-maker-detail";

export function useOrderMakerDetail({ order }: { order: IOrder }) {
  const { data: makerDetail } = useMakerDetail({
    makerId: order.maker_id,
  });

  const { data: preOrderMakerDetail } = useMakerDetail({
    makerId: order.preOrderDetail?.maker_id || "",
  });

  return {
    makerDetail,
    preOrderMakerDetail,
  };
}
