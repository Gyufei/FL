import useTadleProgram from "@/lib/hooks/web3/solana/use-tadle-program";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { BN } from "bn.js";
import { useTransactionRecord } from "@/lib/hooks/api/use-transactionRecord";
import { useAccountsSol } from "@/lib/hooks/contract/help/use-accounts-sol";
import { useBuildTransactionSol } from "@/lib/hooks/contract/help/use-build-transaction-sol";
import { ChainType } from "@/lib/types/chain";

export function useSettleAskMakerSol({
  chain,
  marketplaceStr,
  makerStr,
  offerStr,
  isNativeToken,
}: {
  chain: ChainType;
  marketplaceStr: string;
  makerStr: string;
  offerStr: string;
  isNativeToken: boolean;
}) {
  const { program } = useTadleProgram();
  const { buildTransaction } = useBuildTransactionSol();
  const { recordTransaction } = useTransactionRecord(chain);
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
      poolTokenAuthority,
    } = await getAccounts();

    const wsolTmpTokenAccount = PublicKey.findProgramAddressSync(
      [Buffer.from("wsol_tmp_token_account"), authority!.toBuffer()],
      program.programId,
    )[0];

    const marketplace = new PublicKey(marketplaceStr);
    const offerA = new PublicKey(offerStr);
    const maker = new PublicKey(makerStr);

    const {
      walletCollateralTokenBalance: walletACollateralTokenBalance,
      // walletPointTokenBalance: walletAPointTokenBalance
    } = await getWalletBalanceAccount(authority!, marketplace, isNativeToken);

    const methodTransaction = await program.methods
      .settleAskMaker(new BN(settleAmount))
      .accounts({
        manager: authority,
        authority,
        systemConfig,
        userCollateralTokenBalance: walletACollateralTokenBalance,
        maker,

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
          pubkey: offerA,
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
