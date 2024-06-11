import ModeDesc from "./mode-desc";

export default function MakeMoney() {
  return (
    <div className="mx-[120px] mt-6 flex flex-col items-center pt-6 pb-[72px]">
      <div className="text-[40px] leading-[60px] text-black">
        Trade Points to Make Money
      </div>
      <div className="flex flex-1 items-stretch justify-between space-x-[80px]">
        <div className="flex-1 pt-[60px]">
          <div className="mb-[30px] text-[30px] leading-[42px] text-black">
            Special Point Market
          </div>
          <div className="flex flex-col space-y-4 text-base leading-[30px] text-gray">
            <div>
              Points from selected projects can be traded for an unlimited
              number of times. After purchasing points, traders have the
              opportunity to relist and sell them for profits.
            </div>
            <div>
              Upon completing the trade, the seller will receive the funds
              instantly, without having to wait for the token unlock at TGE.
              Sellers can cancel their orders at any time if they are not
              fulfilled and retrieve their collateral, if applicable.
            </div>
            <div>
              Initial point makers who deposit will be entitled to a bonus
              revenue, calculated as a percentage of all subsequent transactions
              involving the points they bring to the market.
            </div>
          </div>
        </div>
        <ModeDesc />
      </div>
    </div>
  );
}
