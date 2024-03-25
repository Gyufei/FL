"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/dashboard") {
      router.push("/dashboard/my-orders");
    }
  });

  return <></>;
}
