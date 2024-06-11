import useTadleProgram from "../web3/use-tadle-program";
import useTxStatus from "./help/use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { BN } from "bn.js";
import { useTransactionRecord } from "../api/use-transactionRecord";
import { useAccounts } from "./help/use-accounts";
import { useBuildTransaction } from "./help/use-build-transaction";

export function useSettleAskTaker({
  marketplaceStr,
  makerStr,
  stockStr,
  preOfferStr,
  preOfferAuthorityStr,
}: {
  marketplaceStr: string;
  makerStr: string;
  stockStr: string;
  preOfferStr: string;
  preOfferAuthorityStr: string;
}) {
  const { program } = useTadleProgram();
  const { buildTransaction } = useBuildTransaction();
  const { recordTransaction } = useTransactionRecord();
  const { getAccounts, getWalletBalanceAccount } = useAccounts();

  const writeAction = async ({
    settleAmount
  }: {
    settleAmount: number
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
    } = await getAccounts(program.programId);

    const poolTokenAuthority = PublicKey.findProgramAddressSync(
      [systemConfig.toBuffer()],
      program.programId,
    )[0];

    const wsolTmpTokenAccount = PublicKey.findProgramAddressSync(
      [Buffer.from("wsol_tmp_token_account"), authority!.toBuffer()],
      program.programId,
    )[0];

    const marketPlace = new PublicKey(marketplaceStr);
    const stock = new PublicKey(stockStr);
    const bidMaker = new PublicKey(makerStr);
    const preOffer = new PublicKey(preOfferStr);

    const {
      walletBaseTokenBalance: walletBBaseTokenBalance,
    } = await getWalletBalanceAccount(program.programId, authority!, marketPlace)

    const preOfferAuthority = new PublicKey(preOfferAuthorityStr);
    const {
      walletBaseTokenBalance: walletABaseTokenBalance,
      walletPointTokenBalance: walletAPointTokenBalance
    } = await getWalletBalanceAccount(program.programId, preOfferAuthority, marketPlace)


    const methodTransaction = await program.methods
      .settleAskTaker(new BN(settleAmount))
      .accounts({
        manager: authority!,
        authority,
        systemConfig,
        makerBaseTokenBalance: walletABaseTokenBalance,
        makerPointTokenBalance: walletAPointTokenBalance,
        userBaseTokenBalance: walletBBaseTokenBalance,
        maker: bidMaker,
        stock,
        preOffer,
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
          isWritable: true
        },
        {
          pubkey: poolPointsTokenAccount,
          isSigner: false,
          isWritable: true
        },
      ]).transaction();

      
    const txHash = await buildTransaction(methodTransaction, program, [], authority!);

    await recordTransaction({
      txHash,
      note: "",
    });

    return txHash;
  };

  const wrapRes = useTxStatus(writeAction);

  return wrapRes;
}
