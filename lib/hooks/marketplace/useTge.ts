import { useCallback } from "react";

export default function useTge() {
  const checkIsDuringTge = useCallback((mpTge: string, period: number) => {
    if (mpTge === "0") {
      return false;
    }

    const tgeTimeNum = Number(mpTge);
    const now = Date.now() / 1000;

    if (now > tgeTimeNum && now < tgeTimeNum + period) {
      return true;
    }

    return false;
  }, []);

  const checkIsAfterTge = useCallback((mpTge: string, period: number) => {
    period;
    if (mpTge === "0") {
      return false;
    }

    const tgeTimeNum = Number(mpTge);
    const now = Date.now() / 1000;

    return now > tgeTimeNum;
  }, []);

  return {
    checkIsDuringTge,
    checkIsAfterTge,
  };
}
