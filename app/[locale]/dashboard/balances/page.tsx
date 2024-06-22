"use client";

import NP from "number-precision";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatNum } from "@/lib/utils/number";
import { useWallet } from "@solana/wallet-adapter-react";
import toPubString from "@/lib/utils/pub-string";
import { IBalance, useUserBalance } from "@/lib/hooks/api/use-user-balance";
import { IToken } from "@/lib/types/token";
import {
  IBalanceType,
  useWithdrawBaseToken,
} from "@/lib/hooks/contract/use-with-draw-base-token";
import { useWithdrawPointToken } from "@/lib/hooks/contract/use-with-draw-point-token";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import { isProduction } from "@/lib/PathMap";
import { useTranslations } from "next-intl";

const TokenListMap: Record<string, IToken> = {
  BoXxLrd1FbYj4Dr22B5tNBSP92fiTmFhHEkRAhN2wDxZ: {
    symbol: "USDC",
    logoURI: "/icons/usdc.svg",
    decimals: 9,
  } as IToken,
  EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: {
    symbol: "USDC",
    logoURI: "/icons/usdc.svg",
    decimals: 6,
  } as IToken,
};

export default function MyBalances() {
  const mbt = useTranslations("page-MyBalance");
  const [openPanel, setOpenPanel] = useState("1");

  const { publicKey } = useWallet();
  const wallet = toPubString(publicKey);

  const { data: balanceData, mutate: refetchBalanceData } =
    useUserBalance(wallet);

  const { data: marketplaceData } = useMarketplaces();

  const {
    isLoading: isWdTokenLoading,
    write: wdTokenAction,
    isSuccess: isWdTokenSuccess,
  } = useWithdrawBaseToken();

  const {
    isLoading: isWdPointLoading,
    write: wdPointAction,
    isSuccess: isWdPointSuccess,
  } = useWithdrawPointToken();

  useEffect(() => {
    if (isWdTokenSuccess || isWdPointSuccess) {
      refetchBalanceData();
    }
  }, [isWdTokenSuccess, isWdPointSuccess, refetchBalanceData]);

  const getTokenDataFormat = useCallback(
    (bData: IBalance | undefined, key: string) => {
      if (!bData) return [];

      const tBalances = bData.token_balance_list;
      const itemData = tBalances?.map((t) => {
        const tokenInfo = TokenListMap[t.token_address];
        const amount = NP.divide((t as any)[key], 10 ** tokenInfo.decimals);
        return {
          amount: Number(amount),
          tokenInfo,
        };
      });

      return itemData;
    },
    [],
  );

  const getPointDataFormat = useCallback(
    (bData: IBalance | undefined) => {
      if (!bData) return [];

      const tBalances = bData.point_token_balance_list;

      const taxIncomes = tBalances?.map((t) => {
        const market = marketplaceData?.find(
          (m) => m.market_place_id === t.market_place_account,
        );

        const tokenInfo = {
          symbol: market?.point_name,
          logoURI: market?.pointLogo,
          marketplaceId: t.market_place_account,
        };
        const amount = NP.divide(t.amount, isProduction ? 10 ** 6 : 10 ** 9);

        return {
          amount: Number(amount),
          tokenInfo,
        };
      });

      return taxIncomes;
    },
    [marketplaceData],
  );

  const taxIncomeData = useMemo(() => {
    const data = getTokenDataFormat(balanceData, "tax_income");
    return data;
  }, [balanceData, getTokenDataFormat]);

  const taxIncomeTotal = useMemo(() => {
    return taxIncomeData.reduce((acc, t) => acc + t.amount, 0);
  }, [taxIncomeData]);

  const realizedAssetsData = useMemo(() => {
    const data = getPointDataFormat(balanceData);
    return data;
  }, [getPointDataFormat, balanceData]);

  const realizedAssetsTotal = useMemo(() => {
    return realizedAssetsData.reduce((acc, t) => acc + t.amount, 0);
  }, [realizedAssetsData]);

  const referralData = useMemo(() => {
    const data = getTokenDataFormat(balanceData, "referral_bonus");
    return data;
  }, [balanceData, getTokenDataFormat]);

  const referralTotal = useMemo(() => {
    return referralData.reduce((acc, t) => acc + t.amount, 0);
  }, [referralData]);

  const salesRevenueData = useMemo(() => {
    const data = getTokenDataFormat(balanceData, "sales_revenue");
    return data;
  }, [balanceData, getTokenDataFormat]);

  const salesRevenueTotal = useMemo(() => {
    return salesRevenueData.reduce((acc, t) => acc + t.amount, 0);
  }, [salesRevenueData]);

  const remainingCashData = useMemo(() => {
    const data = getTokenDataFormat(balanceData, "remaining_cash");
    return data;
  }, [balanceData, getTokenDataFormat]);

  const remainingCashTotal = useMemo(() => {
    return remainingCashData.reduce((acc, t) => acc + t.amount, 0);
  }, [remainingCashData]);

  const makerRefundData = useMemo(() => {
    const data = getTokenDataFormat(balanceData, "maker_refund");
    return data;
  }, [balanceData, getTokenDataFormat]);

  const makerRefundTotal = useMemo(() => {
    return makerRefundData.reduce((acc, t) => acc + t.amount, 0);
  }, [makerRefundData]);

  function handleOpenPanel(panelIndex: string) {
    if (!panelIndex) return;
    setOpenPanel(panelIndex);
  }

  function handleWithdrawToken(mode: IBalanceType) {
    if (isWdTokenLoading) return;
    wdTokenAction({
      mode,
    });
  }

  function handleWithdrawPoint(market: string) {
    if (isWdPointLoading) return;
    wdPointAction({
      marketplaceStr: market,
    });
  }

  return (
    <div className="ml-5 flex h-full flex-1 flex-col">
      <div className="flex items-center space-x-5">
        <div className="text-xl leading-[30px] text-black">
          {mbt("cap-MyBalances")}
        </div>
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
                name={mbt("cap-BonusIncome")}
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
                    onClick={() => handleWithdrawToken("taxIncome")}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="realizedAssetsData">
            <AccordionTrigger showIcon={false}>
              <AcHeader
                open={openPanel === "realizedAssetsData"}
                name={mbt("cap-RealizedAssets")}
                walletCount={realizedAssetsData?.length || 0}
                totalAmount={realizedAssetsTotal}
              />
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-5">
                {realizedAssetsData.map((i, index) => (
                  <TokenGetCard
                    key={index}
                    name={i.tokenInfo?.symbol || ""}
                    logo={i.tokenInfo?.logoURI || ""}
                    amount={i.amount}
                    onClick={() =>
                      handleWithdrawPoint(i.tokenInfo.marketplaceId || "")
                    }
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="referralData">
            <AccordionTrigger showIcon={false}>
              <AcHeader
                open={openPanel === "referralData"}
                name={mbt("cap-ReferralBonus")}
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
                    onClick={() => handleWithdrawToken("referralBonus")}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="salesRevenueData">
            <AccordionTrigger showIcon={false}>
              <AcHeader
                open={openPanel === "salesRevenueData"}
                name={mbt("cap-SalesRevenue")}
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
                    onClick={() => handleWithdrawToken("salesRevenue")}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="remainingCashData">
            <AccordionTrigger showIcon={false}>
              <AcHeader
                open={openPanel === "remainingCashData"}
                name={mbt("cap-RemainingCash")}
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
                    onClick={() => handleWithdrawToken("remainingCash")}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="makerRefundData">
            <AccordionTrigger showIcon={false}>
              <AcHeader
                open={openPanel === "makerRefundData"}
                name={mbt("cap-MakerRefund")}
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
                    onClick={() => handleWithdrawToken("makerRefund")}
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
  const mbt = useTranslations("page-MyBalance");

  return (
    <div className="flex flex-1 items-center justify-between">
      <div className="flex flex-1 items-center text-lg leading-[28px] ">
        <div className="flex flex-1 justify-start text-black">{name}</div>
        <div className="flex flex-1 items-center gap-x-[10px]">
          <div className="text-gray">{mbt("cap-WalletCount")}</div>
          <div className="text-black">{walletCount}</div>
        </div>
        <div className="flex flex-1 items-center gap-x-[10px]">
          <div className="text-gray">{mbt("cap-TotalAmount")}</div>
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
  onClick,
}: {
  name: string;
  logo: string;
  amount: number;
  onClick: () => void;
}) {
  const mbt = useTranslations("page-MyBalance");

  return (
    <div className="flex w-[220px] flex-col items-stretch justify-between rounded-xl bg-white px-4 py-3">
      <div className="flex flex-col">
        <div className="text-sm leading-5 text-lightgray">
          {mbt("lb-Token")}
        </div>
        <div className="flex items-center gap-x-1">
          <Image src={logo} width={16} height={16} alt="token logo" />
          <div className="text-base leading-6 text-black">{name}</div>
        </div>
      </div>

      <div className="mt-[10px] flex items-end justify-between">
        <div className="flex flex-col">
          <div className="text-sm leading-5 text-lightgray">
            {mbt("lb-Amount")}
          </div>
          <div className="text-base leading-6 text-black">
            {formatNum(amount)}
          </div>
        </div>
        <WithWalletConnectBtn onClick={onClick} shouldSignIn={true}>
          <div
            data-active={amount > 0}
            className="flex h-7 w-14 cursor-pointer items-center justify-center rounded-full border border-[#d3d4d6] hover:border-0 hover:bg-yellow data-[active=false]:pointer-events-none data-[active=false]:opacity-70"
          >
            {mbt("btn-Get")}
          </div>
        </WithWalletConnectBtn>
      </div>
    </div>
  );
}
