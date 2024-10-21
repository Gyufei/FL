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
import { useWithdrawToken } from "@/lib/hooks/contract/use-with-draw-token";
import { useWithdrawItem } from "@/lib/hooks/contract/use-with-draw-item";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
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
  withdrawerName: IBalanceType | null;
  isPoint: boolean;
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

  const { data: tokens } = useTokens();

  const { data: tokenBlcData, mutate: refetchTokenBlcData } =
    useUserTokenBalance(wallet);

  const { data: itemBlcData, mutate: refetchItemBlcData } =
    useUserItemBalance(wallet);

  const { data: marketplaceData } = useMarketplaces();

  const {
    isLoading: isWdTokenLoading,
    write: wdTokenAction,
    isSuccess: isWdTokenSuccess,
  } = useWithdrawToken();

  const {
    isLoading: isWdItemLoading,
    write: wdItemAction,
    isSuccess: isWdItemSuccess,
  } = useWithdrawItem();

  useEffect(() => {
    if (isWdTokenSuccess) {
      refetchTokenBlcData();
    }
  }, [isWdTokenSuccess, refetchTokenBlcData]);

  useEffect(() => {
    if (isWdItemSuccess) {
      refetchItemBlcData();
    }
  }, [isWdItemSuccess, refetchItemBlcData]);

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
        marketplaceId: market?.market_place_id,
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
  }, [getPointDataFormat, tokenBlcData]);

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
        isPoint: false,
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
        isPoint: true,
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
        isPoint: false,
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
        isPoint: false,
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
        isPoint: false,
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
        isPoint: false,
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

  function handleWithdrawToken(mode: string, tokenInfo: IToken | null) {
    if (isWdTokenLoading) return;
    wdTokenAction({
      tokenAddress: tokenInfo?.address,
      mode,
    });
  }

  function handleWithdrawItem(tokenInfo: IToken | null) {
    if (isWdItemLoading) return;
    wdItemAction({
      marketplaceStr: (tokenInfo as any).marketplaceId,
      tokenAddress: tokenInfo?.address,
    });
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
                        name={i.tokenInfo?.symbol || ""}
                        logo={i.tokenInfo?.logoURI || ""}
                        amount={i.amount}
                        onClick={() =>
                          !item.isPoint
                            ? handleWithdrawToken(
                                item.withdrawerName!,
                                i.tokenInfo || null,
                              )
                            : handleWithdrawItem(i.tokenInfo || null)
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
          <Image
            src={logo}
            width={16}
            height={16}
            className="rounded-full"
            alt="token logo"
          />
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
        <WithWalletConnectBtn onClick={onClick}>
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
