import { createPublicClient, http } from "viem";
import { bsc, bscTestnet } from "viem/chains";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { isProduction } from "@/lib/PathMap";

const publicClient = createPublicClient({
  chain: isProduction ? bsc : bscTestnet,
  transport: http(),
});

export function useWaitReceipt(hash?: `0x${string}`) {
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!hash) return;

    const watchTransaction = async () => {
      try {
        const receipt = await publicClient.waitForTransactionReceipt({
          hash,
          timeout: 60_000,
        });

        toast.success(`Transaction Successful tx:${hash.slice(0, 9)}...`, {
          position: "bottom-right",
          style: {
            maxWidth: "450px",
          },
        });
        setIsSuccess(true);
      } catch (error) {
        console.error(error);
        toast.error(`Transaction Failed tx:${hash.slice(0, 9)}...`, {
          position: "bottom-right",
          style: {
            maxWidth: "450px",
          },
        });
      }
    };

    watchTransaction();
  }, [hash]);

  return { isSuccess };
}
