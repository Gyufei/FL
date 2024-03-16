import MenuCol from "@/components/dashboard/menu-col";
import StockInfo from "@/components/dashboard/stock-info";
import PageFooter from "@/components/share/page-footer";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[calc(100vh-96px)] w-full flex-col">
      <div className="flex flex-1 items-stretch">
        <div className="ml-4 flex flex-1 rounded-3xl bg-[#fafafa] p-5">
          <MenuCol />
          {children}
        </div>
        <div className="w-[368px]">
          <StockInfo />
        </div>
      </div>
      <PageFooter />
    </div>
  );
}
