import { useMakerDetail } from "../api/use-maker-detail";

export function useOfferMakerDetail({ makerId }: {makerId: string}) {
  const { data: makerDetail } = useMakerDetail({
    makerId
  });

  return {
    makerDetail,
  };
}
