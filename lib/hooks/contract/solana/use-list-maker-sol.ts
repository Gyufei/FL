import useTadleProgram from "@/lib/hooks/web3/use-tadle-program";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { BN } from "bn.js";
import { useTransactionRecord } from "@/lib/hooks/api/use-transactionRecord";
import { useAccountsSol } from "@/lib/hooks/contract/help/use-accounts-sol";
import { useBuildTransactionSol } from "@/lib/hooks/contract/help/use-build-transaction-sol";

export function useListMakerSol({
  marketplaceStr,
  makerStr,
  stockStr,
  originOfferStr,
  isNativeToken
}: {
  marketplaceStr: string;
  makerStr: string;
  stockStr: string;
  originOfferStr: string;
  isNativeToken: boolean
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
      userSolTokenAccount
    } = await getAccounts(program.programId);

    const marketPlace = new PublicKey(marketplaceStr);
    const stockD = new PublicKey(stockStr);
    const maker = new PublicKey(makerStr);
    const originOffer = new PublicKey(originOfferStr);

    const offerD = PublicKey.findProgramAddressSync(
      [
        Buffer.from("offer"),
        seedAccount.publicKey.toBuffer()
      ],
      program.programId
    )[0];

    const methodTransaction = await program.methods
      .list(
        new BN(receiveTokenAmount),
        new BN(collateralRate),
      )
      .accounts({
        authority: authority,
        seedAccount: seedAccount.publicKey,
        systemConfig,
        stock: stockD,
        offer: offerD,
        originOffer,
        poolTokenAccount: isNativeToken ? poolSolTokenAccount : poolUsdcTokenAccount,
        maker,
        marketPlace,
        tokenMint: isNativeToken ? wsolTokenMint : usdcTokenMint,
        tokenProgram,
        tokenProgram2022,
        systemProgram,
      }).remainingAccounts([
        {
          pubkey: isNativeToken ? userSolTokenAccount : userUsdcTokenAccount,
          isSigner: false,
          isWritable: true
        }
      ]).transaction();

    const txHash = await buildTransaction(methodTransaction, program, [seedAccount], authority!);

    await recordTransaction({
      txHash,
      note: "",
    });

    return txHash;
  };

  const wrapRes = useTxStatus(writeAction);

  return wrapRes;
}
