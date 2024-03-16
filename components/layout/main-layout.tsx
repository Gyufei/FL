import Header from "@/components/layout/header";
import GlobalActionTip from "../share/global-action-tip";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen overflow-y-auto overflow-x-hidden bg-white">
      <div className="flex w-full flex-col justify-between">
        <div className="relative mx-auto w-full">
          <Header />
          {children}
        </div>
      </div>

      <GlobalActionTip />
    </div>
  );
}
