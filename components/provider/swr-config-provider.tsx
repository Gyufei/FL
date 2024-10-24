"use client";

import { SWRConfig } from "swr";

export default function SWRConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SWRConfig
      value={{
        shouldRetryOnError: false,
        onError: (error, key) => {
          console.info({
            variant: "destructive",
            title: `Api: ${key}`,
            description: `${error.status || "error"}: ${
              error.info || "Some Error Occurred"
            }`,
          });
        },
      }}
    >
      {children}
    </SWRConfig>
  );
}
