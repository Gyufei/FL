import dynamic from "next/dynamic";

export const Gauge = dynamic(() => import("react-gauge-component"), {
  ssr: false,
});
