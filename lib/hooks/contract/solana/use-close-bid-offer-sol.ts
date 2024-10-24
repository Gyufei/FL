import useTadleProgram from "@/lib/hooks/web3/solana/use-tadle-program";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { useTransactionRecord } from "@/lib/hooks/api/use-transactionRecord";
import { useAccountsSol } from "@/lib/hooks/contract/help/use-accounts-sol";
import { useBuildTransactionSol } from "@/lib/hooks/contract/help/use-build-transaction-sol";
import { ChainType } from "@/lib/types/chain";

export function useCloseBidOfferSol({
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
  const { getAccounts, getWalletBalanceAccount } = useAccountsSol(
    program.programId,
  );

  const { buildTransaction } = useBuildTransactionSol();
  const { recordTransaction } = useTransactionRecord(chain);

  const writeAction = async () => {
    const { authority, systemProgram, systemConfig } = await getAccounts();

    const marketplace = new PublicKey(marketplaceStr);
    const maker = new PublicKey(makerStr);
    const offerD = new PublicKey(offerStr);

    const { walletCollateralTokenBalance: walletDCollateralTokenBalance } =
      await getWalletBalanceAccount(authority!, marketplace, isNativeToken);

    const methodTransaction = await program.methods
      .closeBidOffer()
      .accounts({
        authority,
        userCollateralTokenBalance: walletDCollateralTokenBalance,
        systemConfig,
        maker,
        marketplace,
        systemProgram,
      })
      .remainingAccounts([
        {
          pubkey: offerD,
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
