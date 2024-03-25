import { Paths } from "@/lib/PathMap";
import { useEndPoint } from "./use-endpoint";
import fetcher from "@/lib/fetcher";
import { useWallet } from "@solana/wallet-adapter-react";

export interface IAddParams {
  tx_hash: string;
  changed_accounts: Array<{
    account: string;
    account_type: "maker" | "order" | "market_place";
  }>;
  transaction_note: string;
}

// export interface IUpdateParams {
//   tx_hash: string;
//   tx_status?: "1" | "2" | "3" | "4" | "5";
// }

export function useTransactionRecord() {
  const { apiEndPoint } = useEndPoint();
  const { publicKey } = useWallet();

  function parsedAddParams({
    maker,
    order,
    marketplace,
    txHash,
    note,
  }: {
    maker: string;
    order: string;
    marketplace: string;
    txHash: string;
    note: string;
  }) {
    return {
      tx_hash: txHash,
      wallet: publicKey?.toString(),
      changed_accounts: [
        {
          account: maker,
          account_type: "maker",
        },
        {
          account: order,
          account_type: "order",
        },
        {
          account: marketplace,
          account_type: "market_place",
        },
      ],
      transaction_note: note,
    } as IAddParams;
  }

  // function parsedUpdateParams({
  //   txHash,
  //   status = "5",
  // }: {
  //   txHash: string;
  //   status?: "1" | "2" | "3" | "4" | "5";
  // }) {
  //   return {
  //     tx_hash: txHash,
  //     tx_status: status,
  //   } as IUpdateParams;
  // }

  async function addTransaction(transactionParams: IAddParams) {
    const addResult = await fetcher(`${apiEndPoint}${Paths.addTransaction}`, {
      method: "post",
      body: JSON.stringify(transactionParams),
    });

    return addResult;
  }

  // async function updateTransaction(updateParams: IUpdateParams) {
  //   const addResult = await fetcher(
  //     `${apiEndPoint}${Paths.updateTransaction}`,
  //     {
  //       method: "post",
  //       body: JSON.stringify(updateParams),
  //     },
  //   );

  //   return addResult;
  // }

  async function recordTransaction({
    maker,
    order,
    marketplace,
    txHash,
    note,
  }: {
    maker: string;
    order: string;
    marketplace: string;
    txHash: string;
    note: string;
  }) {
    const addParams = parsedAddParams({
      maker,
      order,
      marketplace,
      txHash,
      note,
    });
    // const updateParams = parsedUpdateParams({
    //   txHash,
    // });

    await addTransaction(addParams);
    // await updateTransaction(updateParams);

    return true;
  }

  return {
    recordTransaction,
  };
}
