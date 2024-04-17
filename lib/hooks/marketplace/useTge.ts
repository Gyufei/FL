import { useCallback } from "react";

export default function useTge() {
  const checkIsAfterTge = useCallback((mpTge: string) => {
    if (mpTge === "0") {
      return false;
    }

    const tgeTimeNum = Number(mpTge);
    const now = Date.now() / 1000;
    return now > tgeTimeNum;
  }, []);

  return {
    checkIsAfterTge,
  };
}
