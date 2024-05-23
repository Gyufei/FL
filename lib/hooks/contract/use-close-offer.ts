import useTadleProgram from "../web3/use-tadle-program";
import useTxStatus from "./use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { useTransactionRecord } from "../api/use-transactionRecord";
import { useAccounts } from "./use-accounts";

export function useCloseOffer({
  marketplaceStr,
  makerStr,
  offerStr,
}: {
  marketplaceStr: string;
  makerStr: string;
  offerStr: string;
}) {
  const { program } = useTadleProgram();
  const { getAccounts, getWalletBalanceAccount } = useAccounts();

  const { recordTransaction } = useTransactionRecord();

  const writeAction = async () => {
    const {
      authority,
      systemProgram,
      systemConfig,
    } = await getAccounts(program.programId);

    const marketPlace = new PublicKey(marketplaceStr);
    const maker = new PublicKey(makerStr);
    const offer = new PublicKey(offerStr);

    const {
      walletBaseTokenBalance: walletDBaseTokenBalance,
    } = await getWalletBalanceAccount(program.programId, authority!, marketPlace)

    const txHash = await program.methods
      .closeOffer()
      .accounts({
        authority,
        systemConfig,
        userBaseTokenBalance: walletDBaseTokenBalance,
        offer,
        maker,
        systemProgram,
      })
      .signers([]).rpc();

    await recordTransaction({
      txHash,
      note: "",
    });

    return txHash;
  };

  const wrapRes = useTxStatus(writeAction);

  return wrapRes;
}
