import useTadleProgram from "@/lib/hooks/web3/solana/use-tadle-program";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { BN } from "bn.js";
import { useTransactionRecord } from "@/lib/hooks/api/use-transactionRecord";
import { useAccountsSol } from "@/lib/hooks/contract/help/use-accounts-sol";
import { useBuildTransactionSol } from "@/lib/hooks/contract/help/use-build-transaction-sol";

export function useSettleAskTakerSol({
  marketplaceStr,
  makerStr,
  holdingStr,
  preOfferStr,
  preOfferAuthorityStr,
  isNativeToken,
}: {
  marketplaceStr: string;
  makerStr: string;
  holdingStr: string;
  preOfferStr: string;
  preOfferAuthorityStr: string;
  isNativeToken: boolean;
}) {
  const { program } = useTadleProgram();
  const { buildTransaction } = useBuildTransactionSol();
  const { recordTransaction } = useTransactionRecord();
  const { getAccounts, getWalletBalanceAccount } = useAccountsSol(
    program.programId,
  );

  const writeAction = async ({ settleAmount }: { settleAmount: number }) => {
    const {
      tokenProgram,
      tokenProgram2022,
      authority,
      systemProgram,
      systemConfig,
      userPointsTokenAccount,
      poolPointsTokenAccount,
      projectTokenMint,
      associatedTokenProgram,
    } = await getAccounts();

    const poolTokenAuthority = PublicKey.findProgramAddressSync(
      [systemConfig.toBuffer()],
      program.programId,
    )[0];

    const wsolTmpTokenAccount = PublicKey.findProgramAddressSync(
      [Buffer.from("wsol_tmp_token_account"), authority!.toBuffer()],
      program.programId,
    )[0];

    const marketplace = new PublicKey(marketplaceStr);
    const holding = new PublicKey(holdingStr);
    const bidMaker = new PublicKey(makerStr);
    const preOffer = new PublicKey(preOfferStr);

    const { walletCollateralTokenBalance: walletBCollateralTokenBalance } =
      await getWalletBalanceAccount(authority!, marketplace, isNativeToken);

    const preOfferAuthority = new PublicKey(preOfferAuthorityStr);
    const {
      walletCollateralTokenBalance: walletACollateralTokenBalance,
      walletPointTokenBalance: walletAProjectTokenBalance,
    } = await getWalletBalanceAccount(
      preOfferAuthority,
      marketplace,
      isNativeToken,
    );

    const methodTransaction = await program.methods
      .settleAskTaker(new BN(settleAmount))
      .accounts({
        manager: authority!,
        authority,
        systemConfig,
        makerCollateralTokenBalance: walletACollateralTokenBalance,
        makerProjectTokenBalance: walletAProjectTokenBalance,
        userCollateralTokenBalance: walletBCollateralTokenBalance,
        maker: bidMaker,
        holding,
        marketplace,
        poolTokenAuthority,
        wsolTmpTokenAccount,
        projectTokenMint,
        tokenProgram,
        tokenProgram2022,
        projectTokenProgram: tokenProgram,
        associatedTokenProgram,
        systemProgram,
      })
      .remainingAccounts([
        {
          pubkey: preOffer,
          isSigner: false,
          isWritable: true,
        },
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
