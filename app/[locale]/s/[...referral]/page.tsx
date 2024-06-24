"use client";
import { redirect } from "@/app/navigation";

export default function ReferralPage({ params }: { params: any }) {
  const referral = params.referral[0];

  redirect(`/marketplace?s=${referral}`);

  return null;
}
