"use client";
import PageFooter from "../_page-layout/_page-footer";
import PointMarket from "./point-market";
// import Post from "./post";
// import MockMarket from "./mock-market";
import TrendingAsset from "./trending-asset";
// import { redirect } from "@/app/navigation";

export default function Marketplace() {
  return (
    <div className="flex h-[calc(100vh-96px)] w-full flex-col">
      <div className="flex flex-1 items-stretch">
        <div className="flex flex-1 flex-col pl-6">
          <PointMarket />
          {/* <MockMarket className="mt-6" /> */}
        </div>
        <div className="flex w-[368px] flex-col px-6">
          <TrendingAsset />
          {/* <Post /> */}
        </div>
      </div>
      <PageFooter />
    </div>
  );
}
