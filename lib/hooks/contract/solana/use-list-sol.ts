import useTadleProgram from "@/lib/hooks/web3/solana/use-tadle-program";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { BN } from "bn.js";
import { useTransactionRecord } from "@/lib/hooks/api/use-transactionRecord";
import { useAccountsSol } from "@/lib/hooks/contract/help/use-accounts-sol";
import { useBuildTransactionSol } from "@/lib/hooks/contract/help/use-build-transaction-sol";

export function useListSol({
  marketplaceStr,
  makerStr,
  holdingStr,
  preOfferStr,
  originOfferStr,
  isNativeToken,
}: {
  marketplaceStr: string;
  makerStr: string;
  holdingStr: string;
  preOfferStr: string;
  originOfferStr: string;
  isNativeToken: boolean;
}) {
  const { program } = useTadleProgram();
  const { buildTransaction } = useBuildTransactionSol();
  const { recordTransaction } = useTransactionRecord();
  const { getAccounts } = useAccountsSol();

  const writeAction = async ({
    receiveTokenAmount,
    collateralRate,
  }: {
    receiveTokenAmount: number;
    collateralRate: number;
  }) => {
    const {
      tokenProgram,
      seedAccount,
      tokenProgram2022,
      authority,
      systemProgram,
      systemConfig,
      userUsdcTokenAccount,
      poolUsdcTokenAccount,
      poolSolTokenAccount,
      usdcTokenMint,
      wsolTokenMint,
      userSolTokenAccount,
    } = await getAccounts(program.programId);

    const marketplace = new PublicKey(marketplaceStr);
    const holdingD = new PublicKey(holdingStr);
    const maker = new PublicKey(makerStr);
    const preOffer = new PublicKey(preOfferStr);
    const originOffer = new PublicKey(originOfferStr);

    const offerD = PublicKey.findProgramAddressSync(
      [Buffer.from("offer"), seedAccount.publicKey.toBuffer()],
      program.programId,
    )[0];

    const methodTransaction = await program.methods
      .list(new BN(receiveTokenAmount), new BN(collateralRate))
      .accounts({
        authority: authority,
        seedAccount: seedAccount.publicKey,
        systemConfig,
        holding: holdingD,
        offer: offerD,
        poolTokenAccount: isNativeToken
          ? poolSolTokenAccount
          : poolUsdcTokenAccount,
        maker,
        marketplace,
        collateralTokenMint: isNativeToken ? wsolTokenMint : usdcTokenMint,
        tokenProgram,
        tokenProgram2022,
        systemProgram,
      })
      .remainingAccounts([
        {
          pubkey: originOffer,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: preOffer,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: isNativeToken ? userSolTokenAccount : userUsdcTokenAccount,
          isSigner: false,
          isWritable: true,
        },
      ])
      .transaction();

    const txHash = await buildTransaction(
      methodTransaction,
      program,
      [seedAccount],
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
