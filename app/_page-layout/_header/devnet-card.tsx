export function DevnetCard({ isActive }: { isActive: boolean }) {
  function goClaimTestToken() {}

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
        <div
          onClick={goClaimTestToken}
          className="flex cursor-pointer items-center text-[#99a0af] hover:text-[#2D2E33]"
        >
          <div className="mr-1 h-1 w-1 rounded-full bg-current"></div>
          <div className="text-xs leading-[18px]">Claim test tokens</div>
        </div>
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
