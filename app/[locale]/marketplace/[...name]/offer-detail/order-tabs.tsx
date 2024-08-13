import { SmallSwitch } from "@/components/share/small-switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMemo, useState } from "react";
import { TakerOrder, TakerOrders } from "./taker-orders";
import { IOffer } from "@/lib/types/offer";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import useOfferStocks from "@/lib/hooks/offer/use-offer-stocks";
import { useTranslations } from "next-intl";
import useWalletInfo from "@/lib/hooks/web3/use-wallet-info";

export default function OrderTabs({ order }: { order: IOffer }) {
  const T = useTranslations("drawer-OfferDetail");
  const [currentTab, setCurrentTab] = useState("orders");

  const { address } = useWalletInfo();

  const { offerLogo, forLogo, orderEqTokenInfo, orderTokenInfo } =
    useOfferFormat({
      offer: order,
    });

  const [onlyMe, setOnlyMe] = useState(false);

  const { data: stocks } = useOfferStocks({ offer: order });

  const orders = useMemo(() => {
    if (!stocks) return [];
    const allStocks = onlyMe
      ? stocks.filter((s: any) => s.authority === address)
      : stocks;
    return allStocks.map((s: any) => {
      return {
        create_at: s.create_at,
        deposits: s.amount,
        from: "",
        points: s.points,
        sub_no: s.stock_id,
        to: "",
        total_points: s?.pre_offer_detail?.points || 0,
        tx_hash: s.tx_hash,
        order_id: s.stock_id,
      };
    }) as Array<TakerOrder>;
  }, [stocks, onlyMe, address]);

  return (
    <div className="mt-4 max-h-[415px] rounded-[20px] bg-[#fafafa] p-4 pb-6">
      <Tabs
        value={currentTab}
        className="flex flex-1 flex-col"
        onValueChange={setCurrentTab}
      >
        <TabsList className="flex items-end justify-between p-0">
          <div className="flex items-center justify-start space-x-10">
            <TabsTrigger
              className="flex w-[105px] items-center pt-0 pl-0 pb-[10px] leading-6 data-[state=active]:border-b-2 data-[state=inactive]:border-transparent data-[state=active]:border-lightgray data-[state=inactive]:text-lightgray data-[state=active]:text-black"
              value="orders"
            >
              {T("cap-TakerOrders")}
            </TabsTrigger>
            {/* <TabsTrigger
              className="w-[105px] leading-6 data-[state=active]:border-b-2 data-[state=inactive]:border-transparent data-[state=active]:border-lightgray data-[state=inactive]:text-lightgray data-[state=active]:text-black"
              value="history"
            >
              {T("cap-OrderHistory")}
            </TabsTrigger> */}
          </div>
          <div className="flex items-center space-x-2">
            <label
              htmlFor="onlyMe"
              className="text-xs leading-[18px] text-gray"
            >
              {T("tg-OnlyMe")}
            </label>
            <SmallSwitch
              checked={onlyMe}
              onCheckedChange={(v) => setOnlyMe(v)}
              id="onlyMe"
            />
          </div>
        </TabsList>
        <TabsContent value="orders" className="h-fit">
          {orderTokenInfo && (
            <TakerOrders
              orders={orders || []}
              offerLogo={offerLogo}
              forLogo={forLogo}
              orderTokenInfo={orderTokenInfo}
              orderEqTokenInfo={orderEqTokenInfo}
            />
          )}
        </TabsContent>
        <TabsContent value="history" className="flex-1"></TabsContent>
      </Tabs>
    </div>
  );
}
