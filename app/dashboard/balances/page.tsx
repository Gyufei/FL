"use client";

import NP from "number-precision";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatNum } from "@/lib/utils/number";
import { useWallet } from "@solana/wallet-adapter-react";
import toPubString from "@/lib/utils/pub-string";
import {
  IBalance,
  useUserBalance,
} from "@/lib/hooks/api/use-user-balance";
import { IToken } from "@/lib/types/token";

const TokenListMap: Record<string, IToken> = {
  BoXxLrd1FbYj4Dr22B5tNBSP92fiTmFhHEkRAhN2wDxZ: {
    symbol: "USDC",
    logoURI: "/icons/usdc.svg",
    decimals: 9,
  } as IToken,
};

export default function MyBalances() {
  const [openPanel, setOpenPanel] = useState("1");

  const { publicKey } = useWallet();
  const wallet = toPubString(publicKey);

  const { data: balanceData } = useUserBalance(wallet);

  const getDataFormat = useCallback(
    (bData: IBalance | undefined, firstKey: keyof IBalance, key: string) => {
      if (!bData) return [];

      const tBalances = bData[firstKey];
      const taxIncomes = tBalances?.map((t) => {
        const tokenInfo = TokenListMap[t.token_address];
        const amount = NP.divide((t as any)[key], 10 ** tokenInfo.decimals);
        return {
          amount: Number(amount),
          tokenInfo,
        };
      });

      return taxIncomes;
    },
    [],
  );

  const taxIncomeData = useMemo(() => {
    const data = getDataFormat(balanceData, "token_balance_list", "tax_income");
    return data;
  }, [balanceData, getDataFormat]);

  const taxIncomeTotal = useMemo(() => {
    return taxIncomeData.reduce((acc, t) => acc + t.amount, 0);
  }, [taxIncomeData]);

  const realizedAssetsData = useMemo(() => {
    const data = getDataFormat(
      balanceData,
      "point_token_balance_list",
      "realized_asset",
    );
    return data;
  }, [balanceData, getDataFormat]);

  const realizedAssetsTotal = useMemo(() => {
    return realizedAssetsData.reduce((acc, t) => acc + t.amount, 0);
  }, [realizedAssetsData]);

  const referralData = useMemo(() => {
    const data = getDataFormat(balanceData, "token_balance_list", "tax_income");
    return data;
  }, [balanceData, getDataFormat]);

  const referralTotal = useMemo(() => {
    return referralData.reduce((acc, t) => acc + t.amount, 0);
  }, [taxIncomeData]);

  const salesRevenueData = useMemo(() => {
    const data = getDataFormat(
      balanceData,
      "token_balance_list",
      "sales_revenue",
    );
    return data;
  }, [balanceData, getDataFormat]);

  const salesRevenueTotal = useMemo(() => {
    return salesRevenueData.reduce((acc, t) => acc + t.amount, 0);
  }, [salesRevenueData]);

  const remainingCashData = useMemo(() => {
    const data = getDataFormat(
      balanceData,
      "token_balance_list",
      "remaining_cash",
    );
    return data;
  }, [balanceData, getDataFormat]);

  const remainingCashTotal = useMemo(() => {
    return remainingCashData.reduce((acc, t) => acc + t.amount, 0);
  }, [remainingCashData]);

  const makerRefundData = useMemo(() => {
    const data = getDataFormat(
      balanceData,
      "token_balance_list",
      "maker_refund",
    );
    return data;
  }, [balanceData, getDataFormat]);

  const makerRefundTotal = useMemo(() => {
    return makerRefundData.reduce((acc, t) => acc + t.amount, 0);
  }, [makerRefundData]);

  function handleOpenPanel(panelIndex: string) {
    if (!panelIndex) return;
    setOpenPanel(panelIndex);
  }

  return (
    <div className="ml-5 flex h-full flex-1 flex-col">
      <div className="flex items-center space-x-5">
        <div className="text-xl leading-[30px] text-black">My Balances</div>
      </div>
      <div className="relative mt-5 flex w-full flex-1 flex-col justify-between border-t border-[#eee]">
        <Accordion
          type="single"
          collapsible
          value={openPanel}
          onValueChange={(v) => handleOpenPanel(v)}
        >
          <AccordionItem value="taxIncomeData">
            <AccordionTrigger showIcon={false}>
              <AcHeader
                open={openPanel === "taxIncomeData"}
                name="Tax Income"
                walletCount={taxIncomeData?.length || 0}
                totalAmount={taxIncomeTotal}
              />
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-5">
                {taxIncomeData.map((i, index) => (
                  <TokenGetCard
                    key={index}
                    name={i.tokenInfo?.symbol}
                    logo={i.tokenInfo?.logoURI}
                    amount={i.amount}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="realizedAssetsData">
            <AccordionTrigger showIcon={false}>
              <AcHeader
                open={openPanel === "realizedAssetsData"}
                name="Realized Assets"
                walletCount={realizedAssetsData?.length || 0}
                totalAmount={realizedAssetsTotal}
              />
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-5">
                {realizedAssetsData.map((i, index) => (
                  <TokenGetCard
                    key={index}
                    name={i.tokenInfo?.symbol}
                    logo={i.tokenInfo?.logoURI}
                    amount={i.amount}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="referralData">
            <AccordionTrigger showIcon={false}>
              <AcHeader
                open={openPanel === "referralData"}
                name="Referral Bonus"
                walletCount={referralData?.length || 0}
                totalAmount={referralTotal}
              />
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-5">
                {referralData.map((i, index) => (
                  <TokenGetCard
                    key={index}
                    name={i.tokenInfo?.symbol}
                    logo={i.tokenInfo?.logoURI}
                    amount={i.amount}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="salesRevenueData">
            <AccordionTrigger showIcon={false}>
              <AcHeader
                open={openPanel === "salesRevenueData"}
                name="Sales Revenue"
                walletCount={salesRevenueData?.length || 0}
                totalAmount={salesRevenueTotal}
              />
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-5">
                {salesRevenueData.map((i, index) => (
                  <TokenGetCard
                    key={index}
                    name={i.tokenInfo?.symbol}
                    logo={i.tokenInfo?.logoURI}
                    amount={i.amount}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="remainingCashData">
            <AccordionTrigger showIcon={false}>
              <AcHeader
                open={openPanel === "remainingCashData"}
                name="Remaining Cash"
                walletCount={remainingCashData?.length || 0}
                totalAmount={remainingCashTotal}
              />
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-5">
                {remainingCashData.map((i, index) => (
                  <TokenGetCard
                    key={index}
                    name={i.tokenInfo?.symbol}
                    logo={i.tokenInfo?.logoURI}
                    amount={i.amount}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="makerRefundData">
            <AccordionTrigger showIcon={false}>
              <AcHeader
                open={openPanel === "makerRefundData"}
                name="Maker Refund"
                walletCount={makerRefundData?.length || 0}
                totalAmount={makerRefundTotal}
              />
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-5">
                {makerRefundData.map((i, index) => (
                  <TokenGetCard
                    key={index}
                    name={i.tokenInfo?.symbol}
                    logo={i.tokenInfo?.logoURI}
                    amount={i.amount}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

function AcHeader({
  open,
  name,
  walletCount,
  totalAmount,
}: {
  open: boolean;
  name: string;
  walletCount: number;
  totalAmount: number;
}) {
  return (
    <div className="flex flex-1 items-center justify-between">
      <div className="flex flex-1 items-center text-lg leading-[28px] ">
        <div className="flex flex-1 justify-start text-black">{name}</div>
        <div className="flex flex-1 items-center gap-x-[10px]">
          <div className="text-gray">Wallet Count</div>
          <div className="text-black">{walletCount}</div>
        </div>
        <div className="flex flex-1 items-center gap-x-[10px]">
          <div className="text-gray">Total Amount</div>
          <div className="text-black">{formatNum(totalAmount)}</div>
        </div>
      </div>
      <div>
        {open ? (
          <Image src="/icons/ac-plus.svg" width={24} height={24} alt="open" />
        ) : (
          <Image src="/icons/ac-minus.svg" width={24} height={24} alt="open" />
        )}
      </div>
    </div>
  );
}

function TokenGetCard({
  name,
  logo,
  amount,
}: {
  name: string;
  logo: string;
  amount: number;
}) {
  return (
    <div className="flex w-[220px] flex-col items-stretch justify-between rounded-xl bg-white px-4 py-3">
      <div className="flex flex-col">
        <div className="text-sm leading-5 text-lightgray">Token</div>
        <div className="flex items-center gap-x-1">
          <Image src={logo} width={16} height={16} alt="token logo" />
          <div className="text-base leading-6 text-black">{name}</div>
        </div>
      </div>

      <div className="mt-[10px] flex items-end justify-between">
        <div className="flex flex-col">
          <div className="text-sm leading-5 text-lightgray">Amount</div>
          <div className="text-base leading-6 text-black">
            {formatNum(amount)}
          </div>
        </div>
        <div className="flex h-7 w-14 cursor-pointer items-center justify-center rounded-full border border-[#d3d4d6] hover:border-0 hover:bg-yellow">
          Get
        </div>
      </div>
    </div>
  );
}
