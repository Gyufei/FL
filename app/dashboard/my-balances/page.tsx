import { FeesCard } from "./fees-card";
import { ReferralBonusCard } from "./referral-bonus-card";
import { TaxIncomeCard } from "./tax-income-card";

export default function MyBalances() {
  return (
    <div className="ml-5 flex h-full flex-1 flex-col">
      <div className="flex items-center space-x-5">
        <div className="text-xl leading-[30px] text-black">My Balances</div>
      </div>
      <div className="relative mt-5 flex w-full flex-1 flex-wrap justify-between gap-5 border-t border-[#eee] pt-5">
        <TaxIncomeCard />
        <ReferralBonusCard />
        <FeesCard />
      </div>
    </div>
  );
}
