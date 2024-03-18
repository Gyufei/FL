import MenuCol from "@/app/dashboard/menu-col";
import OverviewInfo from "@/app/dashboard/overview-info";
import PageFooter from "@/app/_page-layout/_page-footer";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[calc(100vh-96px)] w-full flex-col">
      <div className="flex flex-1 items-stretch">
        <div className="ml-4 flex flex-1 rounded-3xl bg-[#fafafa] p-5">
          <MenuCol />
          {children}
        </div>
        <div className="w-[368px]">
          <OverviewInfo />
        </div>
      </div>
      <PageFooter />
    </div>
  );
}
