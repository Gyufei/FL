import { formatNum } from "@/lib/utils/number";
import Image from "next/image";
import ListAskStockBtn from "./list-btn/list-ask-stock-btn";
import DelistBtn from "./delist-btn/delist-btn";
import SettleDrawerBtn from "./settle-btn/settle-drawer-btn";

export default function StockCard({
  stockDetail,
}: {
  stockDetail: Record<string, any>;
}) {
  const isAskStock = stockDetail.type === "sell";
  const isCanList = stockDetail.status === "canList";
  const isListed = stockDetail.status === "listed";
  const isListing = stockDetail.status === "listing";
  const isCanSettle = stockDetail.status === "canSettle";

  return (
    <div className="rounded-[20px] bg-white p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Image
              src={stockDetail.avatar}
              width={48}
              height={48}
              alt="avatar"
              className="rounded-full"
            />
            <div className="absolute right-0 bottom-0 flex h-4 w-4 items-center justify-center rounded-full border border-white bg-white">
              <Image
                src={stockDetail.token.logoURI}
                width={8.8}
                height={7.2}
                alt="avatar"
                className="rounded-full"
              />
            </div>
          </div>

          <div>
            <div className="mb-[2px] leading-6 text-black">
              {stockDetail.name}
            </div>
            <div className="w-fit rounded-[4px] bg-[#F0F1F5] px-[5px] py-[2px] text-[10px] leading-4 text-gray">
              #{stockDetail.no}
            </div>
          </div>
        </div>

        <div
          data-type={stockDetail.type}
          className="flex h-5 items-center rounded px-[10px] text-xs leading-[18px] data-[type=buy]:bg-[#FFEFEF] data-[type=sell]:bg-[#EDF8F4] data-[type=buy]:text-red data-[type=sell]:text-green"
        >
          {!isAskStock ? "Bid" : "Ask"}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-b border-[#F0F1F5] pb-5">
        <div className="flex flex-col">
          <div className="mb-[2px] text-xs leading-[18px] text-gray">Offer</div>
          <div className="flex items-center leading-6 text-black">
            {formatNum(stockDetail.offer, 2, true)}
            <Image
              src={stockDetail.stableToken.logoURI}
              width={16}
              height={16}
              alt="stable"
              className="ml-1"
            />
          </div>
          <div className="text-xs leading-[18px] text-lightgray">
            ${stockDetail.offerPrice} /Diamond
          </div>
        </div>
        <Image
          src="/icons/arrow-right-gray.svg"
          width={20}
          height={20}
          alt="arrow"
        />
        <div className="flex flex-col items-end">
          <div className="mb-[2px] text-xs leading-[18px] text-gray">For</div>
          <div className="flex items-center leading-6 text-black">
            {formatNum(stockDetail.for, 2, true)}
            <Image
              src={stockDetail.stableToken.logoURI}
              width={16}
              height={16}
              alt="stable"
              className="ml-1"
            />
          </div>
          <div className="text-xs leading-[18px] text-lightgray">
            ${stockDetail.forAmount}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        {isCanList || isCanSettle ? (
          <ManToMans num={stockDetail.listedTimes} />
        ) : (
          <div className="text-xs leading-[18px] text-lightgray">
            {stockDetail.date}
          </div>
        )}
        {isCanList && isAskStock && (
          <ListAskStockBtn stockDetail={stockDetail} />
        )}
        {isListed && <div className="text-sm leading-5 text-black">Listed</div>}
        {isListing && <DelistBtn stockDetail={stockDetail} />}
        {isCanSettle && <SettleDrawerBtn stockDetail={stockDetail} />}
      </div>
    </div>
  );
}

function ManToMans({ num }: { num: number }) {
  return (
    <div className="flex items-center space-x-[6px]">
      <Image src="/icons/man.svg" width={20} height={20} alt="man" />
      <Image
        src="/icons/arrow-right-gray.svg"
        width={20}
        height={20}
        alt="man"
      />
      <Image src="/icons/man-group.svg" width={32} height={20} alt="mans" />
      <div className="text-sm leading-5 text-black">{num}</div>
    </div>
  );
}
