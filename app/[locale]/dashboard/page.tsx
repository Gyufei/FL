"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    if (pathname === `${locale}/dashboard`) {
      router.push(`${locale}/dashboard/orders`);
    }
  });

  return <></>;
}
