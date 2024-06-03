import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useFaucet } from "@/lib/hooks/contract/use-faucet";
import SolanaDevIcon from "@/components/share/solana-dev-icon";

export function DevnetRow({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: () => void;
}) {
  const {
    // data: txHash,
    isLoading: isClaiming,
    write: writeAction,
    // isSuccess
  } = useFaucet();

  function handleClaim() {
    if (isClaiming) return;

    writeAction(undefined);
  }

  function goHelp() {}

  return (
    <div
      onClick={() => onClick()}
      data-state={isActive ? "active" : "inactive"}
      className="flex cursor-pointer flex-col rounded-xl px-4 py-3 text-black data-[state=active]:bg-[#FAFAFA]"
    >
      <div className="flex items-center space-x-3 border-b border-dashed border-[#eee] pb-3">
        <SolanaDevIcon />
        <div className="flex-1 text-xs">Solana Dev</div>
      </div>
      <div className="mt-3 flex justify-between px-1">
        <WithWalletConnectBtn onClick={handleClaim} shouldSignIn={true}>
          <div className="flex cursor-pointer items-center text-[#99a0af] hover:text-[#2D2E33]">
            <div className="mr-1 h-1 w-1 rounded-full bg-current"></div>
            <div className="text-xs leading-[18px]">Claim test tokens</div>
          </div>
        </WithWalletConnectBtn>
        <div
          onClick={goHelp}
          className="flex cursor-pointer items-center text-[#99a0af] hover:text-[#2D2E33]"
        >
          <div className="mr-1 h-1 w-1 rounded-full bg-current"></div>
          <div className="text-xs leading-[18px] ">Help</div>
        </div>
      </div>
    </div>
  );
}
