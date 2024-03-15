import MainContent from "@/components/dashboard/main-content";
import StockInfo from "@/components/dashboard/stock-info";
import PageFooter from "@/components/share/page-footer";

export default function Dashboard() {
  return (
    <div className="flex h-[calc(100vh-96px)] w-full flex-col">
      <div className="flex flex-1 items-stretch">
        <MainContent />
        <div className="w-[368px]">
          <StockInfo />
        </div>
      </div>
      <PageFooter />
    </div>
  );
}
