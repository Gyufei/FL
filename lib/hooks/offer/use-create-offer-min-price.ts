import { GlobalMessageAtom } from "@/lib/states/global-message";
import { useSetAtom } from "jotai";

export function useCreateOfferMinPrice() {
  const setGlobalMessage = useSetAtom(GlobalMessageAtom);

  function checkMinPrice(price: number | string, minPrice: number) {
    const minPrice80 = Number(minPrice * 0.8);
    if (!price || Number(price) <= minPrice80) {
      setGlobalMessage({
        type: "error",
        message: `Point price must be greater than ${minPrice80}`,
      });
      return false;
    }

    return true;
  }

  return {
    checkMinPrice,
  };
}
