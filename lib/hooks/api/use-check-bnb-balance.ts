import { useAccount, useBalance } from "wagmi";
import NP from "number-precision";
import { reportEvent } from "@/lib/utils/analytics";
import { GlobalMessageAtom } from "@/lib/states/global-message";
import { useSetAtom } from "jotai";
export function useCheckBnbBalance() {
  const { address } = useAccount();
  const setGlobalMessage = useSetAtom(GlobalMessageAtom);
  const userBalance = useBalance({
    address: address as `0x${string}`,
  });
  const balance = userBalance?.data?.value || "0";

  function checkBalance(needValue: string = "0", needGasPrice: string) {
    const totalNeeded = NP.plus(NP.times(needValue, 10 ** 18), needGasPrice);

    if (Number(balance) < totalNeeded) {
      reportEvent("InsufficientBalance", {
        value: `${balance}-${needValue}-${needGasPrice}`,
      });
      setGlobalMessage({
        type: "error",
        message: "Insufficient Balance",
      });
      return false;
    }
    return true;
  }

  return { checkBalance };
}
