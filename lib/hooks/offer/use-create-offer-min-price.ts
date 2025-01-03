import { toNonExponential } from "@/lib/utils/number";
import toast from "react-hot-toast";
export function useCreateOfferMinPrice() {
  function checkMinPrice(price: number | string, minPrice: number) {
    const minPrice80 = Number(minPrice * 0.8);
    if (!price || Number(price) <= minPrice80) {
      toast.error(
        `Point price must be greater than ${toNonExponential(minPrice80)}`,
      );
      return false;
    }

    return true;
  }

  return {
    checkMinPrice,
  };
}
