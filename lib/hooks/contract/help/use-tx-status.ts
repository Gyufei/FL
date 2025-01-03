import { useEffect, useState } from "react";
import { reportError, reportEvent } from "@/lib/utils/analytics";
import toast from "react-hot-toast";
import { useWaitForTransactionReceipt } from "wagmi";
export default function useTxStatus(
  txFn: (_args: any) => Promise<any>,
  successTip?: string,
  errorTip?: string,
) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isSuccess || isError) {
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(false);
        setIsError(false);
        setData(null);
        setError(null);
      }, 2000);
    }
  }, [isSuccess, isError]);

  const txAction = async (...args: Parameters<typeof txFn>) => {
    setIsLoading(true);

    try {
      const data = await txFn(...args);
      setData(data);
      setIsSuccess(true);
      toast.success(successTip || "Successfully");
    } catch (e: any) {
      setIsError(true);
      setError(e);
      let eMsg = null;
      if (e?.message.includes("User rejected the request")) {
        reportEvent("walletReject", { value: e?.name });
        eMsg = "User rejected.";
      }
      console.error(e);
      if (e?.message.includes("An internal error was received")) {
        reportEvent("walletError", { value: e?.name });
      } else {
        reportError(e);
      }
      if (
        e?.message.includes("An internal error was received") ||
        e?.message.includes("Execution reverted for an unknown reason")
      ) {
        eMsg = "No enough BNB to send transaction.";
      }
      if (eMsg) {
        toast.error(errorTip || eMsg || "Fail: Some error occur");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const { data: txReceipt, error: txError } = useWaitForTransactionReceipt({
    hash: data as `0x${string}`,
    query: {
      enabled: Boolean(data),
    },
    confirmations: 2,
  });

  useEffect(() => {
    if (txReceipt) {
      toast.success("transaction success", {
        position: "bottom-right",
      });
    }
    if (txError) {
      toast.error("transaction fail", {
        position: "bottom-right",
      });
    }
  }, [txReceipt, txError]);

  return {
    data,
    error,
    isLoading,
    isSuccess,
    isError,
    write: txAction,
  };
}
