import useTadleProgram from "@/lib/hooks/web3/solana/use-tadle-program";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { useTransactionRecord } from "@/lib/hooks/api/use-transactionRecord";
import { useAccountsSol } from "@/lib/hooks/contract/help/use-accounts-sol";
import { useBuildTransactionSol } from "@/lib/hooks/contract/help/use-build-transaction-sol";

export function useCloseBidHoldingSol({
  marketplaceStr,
  makerStr,
  holdingStr,
  preOfferStr,
  isNativeToken,
}: {
  marketplaceStr: string;
  makerStr: string;
  holdingStr: string;
  preOfferStr: string;
  isNativeToken: boolean;
}) {
  const { program } = useTadleProgram();
  const { getAccounts, getWalletBalanceAccount } = useAccountsSol(
    program.programId,
  );

  const { buildTransaction } = useBuildTransactionSol();
  const { recordTransaction } = useTransactionRecord();

  const writeAction = async () => {
    const { authority, systemProgram, systemConfig } = await getAccounts();

    const marketplace = new PublicKey(marketplaceStr);
    const maker = new PublicKey(makerStr);
    const preOffer = new PublicKey(preOfferStr);
    const holdingD = new PublicKey(holdingStr);

    const {
      walletCollateralTokenBalance: walletDCollateralTokenBalance,
      walletPointTokenBalance: walletDProjectTokenBalance,
    } = await getWalletBalanceAccount(authority!, marketplace, isNativeToken);

    const methodTransaction = await program.methods
      .closeBidHolding()
      .accounts({
        authority,
        userCollateralTokenBalance: walletDCollateralTokenBalance,
        userProjectTokenBalance: walletDProjectTokenBalance,
        systemConfig,
        holding: holdingD,
        maker,
        marketplace,
        systemProgram,
      })
      .remainingAccounts([
        {
          pubkey: preOffer,
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
