import Image from "next/image";

export default function HomeLinks() {
  return (
    <div className="flex flex-col items-center justify-between py-[60px] px-4 sm:flex-row sm:px-[120px] 2xl:px-0">
      <Image
        src="/icons/logo.svg"
        width={75}
        height={20}
        alt="logo"
        className="mb-8 sm:mb-0"
      />
      <div className="flex flex-wrap items-center space-x-10 sm:flex-nowrap">
        <LinkItem href="">Join Waitlist</LinkItem>
        <LinkItem href="">Contact us</LinkItem>
        <LinkItem href="">Live Contests</LinkItem>
        <LinkItem href="">Docs</LinkItem>
        <LinkItem href="">Blog</LinkItem>
      </div>
    </div>
  );
}

function LinkItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      className="text-sm leading-5 text-lightgray hover:text-black"
      href={href}
    >
      {children}
    </a>
  );
}
