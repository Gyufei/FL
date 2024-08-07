import useTadleProgram from "../web3/use-tadle-program";
import useTxStatus from "./help/use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { BN } from "bn.js";
import { useTransactionRecord } from "../api/use-transactionRecord";
import { useAccounts } from "./help/use-accounts";
import { useBuildTransaction } from "./help/use-build-transaction";

export function useSettleAskMaker({
  marketplaceStr,
  makerStr,
  offerStr,
  isSol,
}: {
  marketplaceStr: string;
  makerStr: string;
  offerStr: string;
  isSol: boolean;
}) {
  const { program } = useTadleProgram();
  const { buildTransaction } = useBuildTransaction();
  const { recordTransaction } = useTransactionRecord();
  const { getAccounts, getWalletBalanceAccount } = useAccounts();

  const writeAction = async ({
    settleAmount,
  }: {
    settleAmount: number;
    stockArr: Array<{
      stock_account: string;
      offer: string;
      authority: string;
    }>;
    isTurbo: boolean;
  }) => {
    const {
      tokenProgram,
      tokenProgram2022,
      authority,
      systemProgram,
      systemConfig,
      userPointsTokenAccount,
      poolPointsTokenAccount,
      pointTokenMint,
      associatedTokenProgram,
      poolTokenAuthority,
    } = await getAccounts(program.programId);

    const wsolTmpTokenAccount = PublicKey.findProgramAddressSync(
      [Buffer.from("wsol_tmp_token_account"), authority!.toBuffer()],
      program.programId,
    )[0];

    const marketPlace = new PublicKey(marketplaceStr);
    const offerA = new PublicKey(offerStr);
    const maker = new PublicKey(makerStr);

    const {
      walletBaseTokenBalance: walletABaseTokenBalance,
      // walletPointTokenBalance: walletAPointTokenBalance
    } = await getWalletBalanceAccount(
      program.programId,
      authority!,
      marketPlace,
      isSol,
    );

    const methodTransaction = await program.methods
      .settleAskMaker(new BN(settleAmount))
      .accounts({
        manager: authority,
        authority,
        systemConfig,
        userBaseTokenBalance: walletABaseTokenBalance,
        maker,
        offer: offerA,
        marketPlace,
        poolTokenAuthority,
        wsolTmpTokenAccount,
        pointTokenMint,
        tokenProgram,
        tokenProgram2022,
        pointTokenProgram: tokenProgram,
        associatedTokenProgram,
        systemProgram,
      })
      .remainingAccounts([
        {
          pubkey: userPointsTokenAccount,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: poolPointsTokenAccount,
          isSigner: false,
          isWritable: true,
        },
      ])
      .transaction();

    const txHash = await buildTransaction(
      methodTransaction,
      program,
      [],
      authority!,
    );

    await recordTransaction({
      txHash,
      note: "",
    });

    return txHash;
  };

  const wrapRes = useTxStatus(writeAction);

  return wrapRes;
}
