import { SmallSwitch } from "@/components/share/small-switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMemo, useState } from "react";
import { TakerOrders } from "./taker-orders";
import { IOrder } from "@/lib/types/order";
import { useOrderFormat } from "@/lib/hooks/order/use-order-format";
import { useWallet } from "@solana/wallet-adapter-react";
import { useOrderSubOrders } from "@/lib/hooks/order/use-order-sub-orders";

export default function OrderTabs({ order }: { order: IOrder }) {
  const [currentTab, setCurrentTab] = useState("orders");

  const { publicKey } = useWallet();

  const { offerLogo, forLogo, orderEqTokenInfo } = useOrderFormat({
    order,
  });

  const { subOrders } = useOrderSubOrders({
    order,
  });

  const [onlyMe, setOnlyMe] = useState(false);

  const orders = useMemo(
    () =>
      subOrders.filter((o) =>
        onlyMe && publicKey ? o.authority === publicKey.toBase58() : true,
      ),
    [publicKey, onlyMe, subOrders],
  );

  return (
    <div className="mt-4 max-h-[415px] rounded-[20px] bg-[#fafafa] p-4">
      <Tabs
        value={currentTab}
        className="flex flex-1 flex-col"
        onValueChange={setCurrentTab}
      >
        <TabsList className="flex items-center justify-between">
          <div className="flex items-center justify-start space-x-10">
            <TabsTrigger
              className="w-[105px] leading-6 data-[state=active]:border-b-2 data-[state=inactive]:border-transparent data-[state=active]:border-lightgray data-[state=inactive]:text-lightgray data-[state=active]:text-black"
              value="orders"
            >
              Taker Orders
            </TabsTrigger>
            <TabsTrigger
              className="w-[105px] leading-6 data-[state=active]:border-b-2 data-[state=inactive]:border-transparent data-[state=active]:border-lightgray data-[state=inactive]:text-lightgray data-[state=active]:text-black"
              value="history"
            >
              Order History
            </TabsTrigger>
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
            orders={orders}
            offerLogo={offerLogo}
            forLogo={forLogo}
            orderEqTokenInfo={orderEqTokenInfo}
          />
        </TabsContent>
        <TabsContent value="history" className="flex-1"></TabsContent>
      </Tabs>
    </div>
  );
}
