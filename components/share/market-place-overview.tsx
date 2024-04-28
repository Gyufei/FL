import Image from "next/image";
import { IMarketplace } from "@/lib/types/marketplace";
import { formatNum } from "@/lib/utils/number";

export default function MarketplaceOverview({
  marketplace,
}: {
  marketplace: IMarketplace;
}) {
  return (
    <div className="mt-3 flex-col space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <LabelText>Floor Price</LabelText>
          <div className="flex items-center text-sm leading-5 text-black">
            {formatNum(marketplace.floor_price, 6)}
            <Image src="/icons/eth.svg" width={18} height={18} alt="token" />
          </div>
        </div>

        <div className="flex flex-col items-end">
          <LabelText>Total Vol.</LabelText>
          <div className="flex items-center text-sm leading-5 text-black">
            {formatNum(marketplace.total_vol)}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <LabelText>24h Change</LabelText>
          <div
            data-up={Number(marketplace.change_rate_24h) > 0}
            className="text-sm leading-5 data-[up=true]:text-green data-[up=false]:text-red"
          >
            {marketplace.change_rate_24h}%
          </div>
        </div>
        <div className="flex flex-col items-end">
          <LabelText>24h Vol.</LabelText>
          <div className="flex items-center text-sm leading-5 text-black">
            ${marketplace.vol_24h}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <LabelText>Listed Supply</LabelText>
          <div className="leading-6 text-black">
            {formatNum(marketplace.listed_supply)}
          </div>
        </div>

        <div className="flex flex-col items-end">
          <LabelText>Avg. Bid</LabelText>
          <div className="flex items-center leading-6 text-black">
            ${formatNum(marketplace.avg_bid)}
          </div>
        </div>
      </div>
    </div>
  );
}

function LabelText({ children }: { children: React.ReactNode }) {
  return <div className="text-xs leading-[18px] text-gray">{children}</div>;
}
