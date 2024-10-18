import { ISettleMode } from "@/lib/types/offer";
import { useChainSendTx } from "./help/use-chain-send-tx";
import { useEndPoint } from "../api/use-endpoint";
import fetcher from "@/lib/fetcher";
import { useTransactionRecord } from "../api/use-transactionRecord";
import useTxStatus from "./help/use-tx-status";
import { useChainWallet } from "../web3/use-chain-wallet";

export function useCreateOffer(marketSymbol: string, chain: string) {
  const { recordTransaction } = useTransactionRecord();
  const { apiEndPoint } = useEndPoint();
  const { sendTx } = useChainSendTx(chain);

  const { address } = useChainWallet();

  const txAction = async (args: {
    direction: "buy" | "sell";
    price: string;
    total_item_amount: number;
    payment_token: string;
    collateral_ratio: number;
    settle_mode: ISettleMode;
    trade_tax_pct: number;
  }) => {
    const res = await fetcher(
      `${apiEndPoint}/market/${marketSymbol}/create_offer?chain=${chain}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...args,
          creator: address,
        }),
      },
    );

    console.log("create offer api res:", res);

    const callParams = {
      ...res,
    };

    const txHash = await sendTx({
      ...callParams,
    });

    await recordTransaction({
      txHash,
      note: "",
    });

    return txHash;
  };

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
