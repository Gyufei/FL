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
import { IToken } from "@/lib/types/token";
import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import { isProduction } from "@/lib/PathMap";
import { useTranslations } from "next-intl";
import { useTokens } from "@/lib/hooks/api/token/use-tokens";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import {
  ITokenBalance,
  useUserTokenBalance,
} from "@/lib/hooks/api/use-user-token-balance";
import {
  IItemBalance,
  useUserItemBalance,
} from "@/lib/hooks/api/use-user-item-balance";
import { TokenGetCard } from "./token-get-card";
import { ChainType } from "@/lib/types/chain";

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
  So11111111111111111111111111111111111111112: {
    symbol: "SOL",
    logoURI: "/icons/solana.svg",
    decimals: 9,
  } as IToken,
};

interface IPanelProps {
  title: string;
  panelName: string;
  withdrawerName: string | null;
  isItem: boolean;
  data: {
    amount: number;
    tokenInfo: IToken;
  }[];
  total: number;
}

export default function MyBalances() {
  const mbt = useTranslations("page-MyBalance");
  const [openPanel, setOpenPanel] = useState("taxIncomeData");

  const { address: wallet } = useChainWallet();

  const { data: tokens } = useTokens(ChainType.ETH);

  const { data: tokenBlcData, mutate: refetchTokenBlcData } =
    useUserTokenBalance(wallet);

  const { data: itemBlcData, mutate: refetchItemBlcData } =
    useUserItemBalance(wallet);

  const { data: marketplaceData } = useMarketplaces();

  const getTokenDataFormat = useCallback(
    (bData: Array<ITokenBalance> | undefined, key: string) => {
      if (!bData || !tokens) return [];

      const itemData = bData?.map((t) => {
        const tokenInfo =
          tokens.find((token) => token.address === t.token_addr) ||
          TokenListMap[t.token_addr];

        const amount = NP.divide(
          (t.ledgers as any)[key],
          10 ** tokenInfo.decimals,
        );

        return {
          amount: Number(amount),
          tokenInfo,
        };
      });

      return itemData;
    },
    [tokens],
  );

  const getPointDataFormat = useCallback(
    (bData: IItemBalance | undefined) => {
      if (!bData) return [];

      const market = marketplaceData?.find(
        (m) => m.market_place_id === bData.market_symbol,
      );

      const tokenInfo = {
        symbol: market?.item_name,
        logoURI: market?.pointLogo,
        market: market,
      } as unknown as IToken;

      const amount = NP.divide(
        bData.total_amount,
        isProduction ? 10 ** 6 : 10 ** 9,
      );

      const taxIncome = {
        amount: Number(amount),
        tokenInfo,
      };

      return [taxIncome];
    },
    [marketplaceData],
  );

  const taxIncomeData = useMemo(() => {
    const data = getTokenDataFormat(tokenBlcData, "tax_income");
    return data;
  }, [tokenBlcData, getTokenDataFormat]);

  const realizedAssetsData = useMemo(() => {
    const data = getPointDataFormat(itemBlcData);
    return data;
  }, [getPointDataFormat, itemBlcData]);

  const referralData = useMemo(() => {
    const data = getTokenDataFormat(tokenBlcData, "referral_bonus");
    return data;
  }, [tokenBlcData, getTokenDataFormat]);

  const salesRevenueData = useMemo(() => {
    const data = getTokenDataFormat(tokenBlcData, "sales_revenue");
    return data;
  }, [tokenBlcData, getTokenDataFormat]);

  const remainingCashData = useMemo(() => {
    const data = getTokenDataFormat(tokenBlcData, "remaining_cash");
    return data;
  }, [tokenBlcData, getTokenDataFormat]);

  const makerRefundData = useMemo(() => {
    const data = getTokenDataFormat(tokenBlcData, "maker_refund");
    return data;
  }, [tokenBlcData, getTokenDataFormat]);

  const dataArray: Array<IPanelProps> = useMemo(() => {
    const items = [];

    if (taxIncomeData.length > 0) {
      const total = taxIncomeData.reduce((acc, t) => acc + t.amount, 0);
      items.push({
        title: mbt("cap-TaxIncome"),
        panelName: "taxIncomeData",
        withdrawerName: "taxIncome",
        isItem: false,
        data: taxIncomeData,
        total,
      } as IPanelProps);
    }

    if (realizedAssetsData.length > 0) {
      const total = realizedAssetsData.reduce((acc, t) => acc + t.amount, 0);
      items.push({
        title: mbt("cap-RealizedAssets"),
        panelName: "realizedAssetsData",
        withdrawerName: null,
        isItem: true,
        data: realizedAssetsData,
        total,
      } as IPanelProps);
    }

    if (referralData.length > 0) {
      const total = referralData.reduce((acc, t) => acc + t.amount, 0);
      items.push({
        title: mbt("cap-ReferralBonus"),
        panelName: "referralData",
        withdrawerName: "referralBonus",
        isItem: false,
        data: referralData,
        total,
      } as IPanelProps);
    }

    if (salesRevenueData.length > 0) {
      const total = salesRevenueData.reduce((acc, t) => acc + t.amount, 0);
      items.push({
        title: mbt("cap-SalesRevenue"),
        panelName: "salesRevenueData",
        withdrawerName: "salesRevenue",
        isItem: false,
        data: salesRevenueData,
        total,
      } as IPanelProps);
    }

    if (remainingCashData.length > 0) {
      const total = remainingCashData.reduce((acc, t) => acc + t.amount, 0);
      items.push({
        title: mbt("cap-RemainingCash"),
        panelName: "remainingCashData",
        withdrawerName: "remainingCash",
        isItem: false,
        data: remainingCashData,
        total,
      } as IPanelProps);
    }

    if (makerRefundData.length > 0) {
      const total = makerRefundData.reduce((acc, t) => acc + t.amount, 0);
      items.push({
        title: mbt("cap-MakerRefund"),
        panelName: "makerRefundData",
        withdrawerName: "makerRefund",
        isItem: false,
        data: makerRefundData,
        total,
      } as IPanelProps);
    }

    return items;
  }, [
    mbt,
    taxIncomeData,
    realizedAssetsData,
    referralData,
    salesRevenueData,
    remainingCashData,
    makerRefundData,
  ]);

  useEffect(() => {
    if (dataArray.length > 0) {
      setOpenPanel(dataArray[0].panelName);
    }
  }, [dataArray]);

  function handleOpenPanel(panelIndex: string) {
    if (!panelIndex) return;
    setOpenPanel(panelIndex);
  }

  return (
    <div className="ml-5 flex h-full flex-1 flex-col">
      <div className="flex items-center space-x-5">
        <div className="text-xl leading-[30px] text-black">
          {mbt("cap-MyBalances")}
        </div>
      </div>
      {dataArray.length > 0 ? (
        <div className="relative mt-5 flex w-full flex-1 flex-col justify-between border-t border-[#eee]">
          <Accordion
            type="single"
            collapsible
            value={openPanel}
            onValueChange={(v) => handleOpenPanel(v)}
          >
            {dataArray.map((item, index) => (
              <AccordionItem key={index} value={item.panelName}>
                <AccordionTrigger showIcon={false}>
                  <AcHeader
                    open={openPanel === item.panelName}
                    name={item.title}
                    walletCount={item.data?.length}
                    totalAmount={item.total}
                  />
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap gap-5">
                    {item.data.map((i, index) => (
                      <TokenGetCard
                        key={index}
                        tokenInfo={i.tokenInfo}
                        amount={i.amount}
                        withdrawerName={
                          item.isItem ? null : item.withdrawerName
                        }
                        onSuccess={() =>
                          item.isItem
                            ? refetchItemBlcData()
                            : refetchTokenBlcData()
                        }
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center text-base text-gray">
          {mbt("txt-YourBalanceAppearHere")}
        </div>
      )}
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
          <Image src="/icons/ac-minus.svg" width={24} height={24} alt="open" />
        ) : (
          <Image src="/icons/ac-plus.svg" width={24} height={24} alt="open" />
        )}
      </div>
    </div>
  );
}
