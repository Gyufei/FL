import { formatNum } from "@/lib/utils/number";
import Image from "next/image";
import ListAskStockBtn from "./list-btn/list-ask-stock-btn";
import SettleDrawerBtn from "./settle-btn/settle-drawer-btn";
import { TokenPairImg } from "@/components/share/token-pair-img";
import { useCurrentChain } from "@/lib/hooks/web3/use-current-chain";
import { useAnchor } from "@/lib/hooks/common/use-anchor";
import { IStock } from "@/lib/types/stock";
import { useStockFormat } from "@/lib/hooks/stock/use-stock-format";
import useOfferStocks from "@/lib/hooks/offer/use-offer-stocks";
import DelistBtn from "./delist-btn/delist-btn";
import { useTranslations } from "next-intl";

export default function StockCard({
  stock,
  onSuccess,
}: {
  stock: IStock;
  onSuccess: () => void;
}) {
  const ct = useTranslations("page-MyStocks");
  const {
    afterTGE,
    afterTGEPeriod,
    offerValue,
    forValue,
    offerLogo,
    pointPerPrice,
    tokenTotalPrice,
    forLogo,
    isCanSettle,
  } = useStockFormat({
    stock,
  });

  const { setAnchorValue } = useAnchor();

  const isAskStock = stock.stock_type === "ask";

  const { data: subOrders } = useOfferStocks({
    offer: stock.pre_offer_detail,
  });

  const { currentChainInfo } = useCurrentChain();

  const isCanList = !afterTGE && !afterTGEPeriod && !isAskStock && !stock.offer;

  const isListed = !afterTGE && !isAskStock && stock.offer;

  function handleOpenDetail() {
    setAnchorValue(
      stock.offer_detail?.offer_id || stock.pre_offer_detail?.offer_id,
    );
  }

  return (
    <div className="rounded-[20px] bg-white p-5">
      <div className="flex items-start justify-between">
        <div
          className="flex cursor-pointer items-center space-x-3"
          onClick={handleOpenDetail}
        >
          <TokenPairImg
            src1={stock.marketplace?.projectLogo}
            src2={currentChainInfo.logo}
            width1={48}
            height1={48}
            width2={8.8}
            height2={8.8}
          />

          <div>
            <div className="mb-[2px] leading-6 text-black">
              {stock.marketplace?.market_name}
            </div>
            <div className="w-fit rounded-[4px] bg-[#F0F1F5] px-[5px] py-[2px] text-[10px] leading-4 text-gray">
              #{stock.stock_id}
            </div>
          </div>
        </div>

        <div
          data-type={stock.stock_type}
          className="flex h-5 items-center rounded px-[10px] text-xs leading-[18px] data-[type=bid]:bg-[#FFEFEF] data-[type=ask]:bg-[#EDF8F4] data-[type=bid]:text-red data-[type=ask]:text-green"
        >
          {!isAskStock ? ct("tag-Bid") : ct("tag-Ask")}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-b border-[#F0F1F5] pb-5">
        <div className="flex flex-col">
          <div className="mb-[2px] text-xs leading-[18px] text-gray">
            {ct("lb-Offer")}
          </div>
          <div className="flex items-center leading-6 text-black">
            {formatNum(offerValue, 2, true)}
            <Image
              src={offerLogo}
              width={16}
              height={16}
              alt="stable"
              className="ml-1 rounded-full"
            />
          </div>
          <div className="overflow-visible whitespace-nowrap text-xs leading-[18px] text-lightgray">
            ${formatNum(pointPerPrice, 6)} / {stock.marketplace.point_name}
          </div>
        </div>
        <Image
          src="/icons/arrow-right-gray.svg"
          width={20}
          height={20}
          alt="arrow"
        />
        <div className="flex flex-col items-end">
          <div className="mb-[2px] text-xs leading-[18px] text-gray">
            {ct("lb-For")}
          </div>
          <div className="flex items-center leading-6 text-black">
            {formatNum(forValue, 2, true)}
            <Image
              src={forLogo}
              width={16}
              height={16}
              alt="stable"
              className="ml-1 rounded-full"
            />
          </div>
          <div className="text-xs leading-[18px] text-lightgray">
            ${formatNum(tokenTotalPrice)}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <ManToMans num={subOrders?.length || 0} isAsk={isAskStock} />
        {isCanList && <ListAskStockBtn order={stock} onSuccess={onSuccess} />}
        {isListed && <DelistBtn />}
        {isCanSettle && <SettleDrawerBtn order={stock} onSuccess={onSuccess} />}
      </div>
    </div>
  );
}

function ManToMans({ num, isAsk }: { num: number; isAsk: boolean }) {
  return (
    <div className="flex items-center space-x-[6px]">
      <Image
        src={isAsk ? "/icons/man.svg" : "/icons/man-gray.svg"}
        width={20}
        height={20}
        alt="man"
      />
      <Image
        src="/icons/arrow-right-gray.svg"
        width={20}
        height={20}
        alt="man"
      />
      {num === 1 && (
        <Image
          src={!isAsk ? "/icons/man.svg" : "/icons/man-gray.svg"}
          width={20}
          height={20}
          alt="man"
        />
      )}
      {num === 2 && (
        <Image
          src={!isAsk ? "/icons/two-man.svg" : "/icons/two-man-gray.svg"}
          width={24}
          height={20}
          alt="man"
        />
      )}
      {num === 3 && (
        <Image
          src={!isAsk ? "/icons/three-man.svg" : "/icons/three-man-gray.svg"}
          width={32}
          height={20}
          alt="man"
        />
      )}
      {num >= 4 && (
        <Image
          src={!isAsk ? "/icons/four-man.svg" : "/icons/four-man-gray.svg"}
          width={36}
          height={20}
          alt="man"
        />
      )}
      <div className="text-sm leading-5 text-black">{num}</div>
    </div>
  );
}
