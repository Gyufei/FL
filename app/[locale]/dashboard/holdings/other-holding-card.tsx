import { formatNum } from "@/lib/utils/number";
import { TokenPairImg } from "@/components/share/token-pair-img";
import { useTranslations } from "next-intl";
import { ChainConfigs } from "@/lib/const/chain-configs";
import { useBalanceDataOf } from "@/lib/hooks/api/use-balanceof";
import NP from "number-precision";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { useUserItemBalance } from "@/lib/hooks/api/use-user-item-balance";
import { ChainType } from "@/lib/types/chain";

export default function OtherHoldingCard({ holding }: { holding: any }) {
  const ct = useTranslations("page-MyStocks");

  return (
    <div className="rounded-[20px] bg-white p-5">
      <div className="flex items-start justify-between">
        <div className="flex cursor-pointer items-center space-x-3">
          <TokenPairImg
            src1={holding.marketplace?.projectLogo}
            src2={ChainConfigs[holding.marketplace.chain].logo}
            width1={48}
            height1={48}
            width2={8.8}
            height2={8.8}
          />

          <div>
            <div className="mb-[2px] leading-6 text-black">
              {holding.marketplace.item_name}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between ">
        <div className="flex flex-col">
          <div className="mb-[2px] text-xs leading-[18px] text-gray">
            {ct("txt-Free")}
          </div>
          <div className="flex items-center leading-6 text-black">
            <BalanceValue
              type="free"
              marketCatagory={holding.marketplace.market_catagory}
              marketSymbol={holding.marketplace.market_symbol}
              chain={holding.marketplace.chain}
            />
          </div>
          <div className="mb-[2px] text-xs leading-[18px] text-gray">
            {ct("txt-Locked")}
          </div>
          <div className="flex items-center leading-6 text-black">
            <BalanceValue
              type="locked"
              marketCatagory={holding.marketplace.market_catagory}
              marketSymbol={holding.marketplace.market_symbol}
              chain={holding.marketplace.chain}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4"></div>
    </div>
  );
}

const BalanceValue = ({
  type,
  marketCatagory,
  marketSymbol,
  chain,
}: {
  type: string;
  marketCatagory: any;
  marketSymbol?: string;
  chain: ChainType;
}) => {
  if (marketCatagory === "point_token") {
    if (type === "free") return <PointTokenBalance chain={chain} />;
    return <>0</>;
  }

  if (marketCatagory === "offchain_fungible_point" && marketSymbol)
    return (
      <OffchainFungiblePointBalance
        marketSymbol={marketSymbol}
        type={type}
        chain={chain}
      />
    );
  return <>0</>;
};

const PointTokenBalance = ({ chain }: { chain: ChainType }) => {
  const { data: balanceData } = useBalanceDataOf(chain);
  return (
    <>
      {balanceData
        ? formatNum(NP.divide(balanceData as any, 10 ** 18), 2, false)
        : 0}
    </>
  );
};

const OffchainFungiblePointBalance = ({
  type,
  marketSymbol,
  chain,
}: {
  type: string;
  marketSymbol: string;
  chain: ChainType;
}) => {
  const { address: wallet } = useChainWallet();

  const { data: itemBlcData } = useUserItemBalance(wallet, marketSymbol, chain);
  if (itemBlcData) {
    if (type === "free") {
      return <>{itemBlcData?.available || 0}</>;
    } else {
      return <>{itemBlcData?.locked || 0}</>;
    }
  }
  return <>0</>;
};
