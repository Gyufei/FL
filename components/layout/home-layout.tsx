import Header from "@/components/layout/header";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen overflow-y-auto overflow-x-hidden bg-white">
      <div className="flex w-full flex-col justify-between px-6 pb-6">
        <div className="relative mx-auto w-full max-w-[1566px]">
          <Header />
          {children}
        </div>
      </div>
    </div>
  );
}
