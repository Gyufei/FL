import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useFaucet } from "@/lib/hooks/contract/use-faucet";

export function DevnetCard({ isActive }: { isActive: boolean }) {
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
      data-active={isActive}
      className="rounded-xl bg-[#fafafa] p-4 zoom-in-50 data-[active=false]:hidden"
    >
      <div className="text-sm leading-5 text-[rgba(153,160,175,0.5)]">
        Try Testnet
      </div>
      <div className="mt-4 flex justify-between">
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
