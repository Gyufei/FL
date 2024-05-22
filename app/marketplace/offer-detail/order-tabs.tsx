import { SmallSwitch } from "@/components/share/small-switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { TakerOrders } from "./taker-orders";
import { IOffer } from "@/lib/types/offer";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import { useWallet } from "@solana/wallet-adapter-react";
import { useTakerOrders } from "@/lib/hooks/api/use-taker-orders";

export default function OrderTabs({ order }: { order: IOffer }) {
  const [currentTab, setCurrentTab] = useState("orders");

  const { publicKey } = useWallet();

  const { offerLogo, forLogo, orderEqTokenInfo, orderTokenInfo } =
    useOfferFormat({
      offer: order,
    });

  const [onlyMe, setOnlyMe] = useState(false);

  const { data: orders } = useTakerOrders(
    order.offer_account,
    onlyMe ? publicKey?.toBase58() : undefined,
  );

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
              Taker Orders
            </TabsTrigger>
            {/* <TabsTrigger
              className="w-[105px] leading-6 data-[state=active]:border-b-2 data-[state=inactive]:border-transparent data-[state=active]:border-lightgray data-[state=inactive]:text-lightgray data-[state=active]:text-black"
              value="history"
            >
              Order History
            </TabsTrigger> */}
          </div>
          <div className="flex items-center space-x-2">
            <label
              htmlFor="onlyMe"
              className="text-xs leading-[18px] text-gray"
            >
              Only Me
            </label>
            <SmallSwitch
              checked={onlyMe}
              onCheckedChange={(v) => setOnlyMe(v)}
              id="onlyMe"
            />
          </div>
        </TabsList>
        <TabsContent value="orders" className="h-fit flex-1">
          <TakerOrders
            orders={orders || []}
            offerLogo={offerLogo}
            forLogo={forLogo}
            orderTokenInfo={orderTokenInfo}
            orderEqTokenInfo={orderEqTokenInfo}
          />
        </TabsContent>
        <TabsContent value="history" className="flex-1"></TabsContent>
      </Tabs>
    </div>
  );
}
