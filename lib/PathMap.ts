export const isPreview = process.env.NEXT_PUBLIC_IS_PREVIEW === "1";
export const isProduction = process.env.NODE_ENV === "production" && !isPreview;
// export const isProduction = true;

export function WithHost(path: string) {
  const prodHost = `https://api.tadle.com`;
  const devHost = `https://preview-apis.tadle.com`;
  const host = isProduction ? prodHost : devHost;
  return `${host}${path}`;
}

export function WithCDN(path: string) {
  const prodCDN = `https://cdn.tadle.com`;
  const devCDN = `https://preview-cdn.tadle.com`;
  const cdn = isProduction ? prodCDN : devCDN;
  return `${cdn}${path}`;
}

export function WithProjectImgCDN(path: string, chain: string) {
  const goPath = path.endsWith(".png") ? path : `${path}.png`;
  return WithCDN(`/${chain}/images/project/${goPath}`);
}

export function WithPointImgCDN(path: string, chain: string) {
  const goPath = path.endsWith(".png") ? path : `${path}.png`;
  return WithCDN(`/${chain}/images/point/${goPath}`);
}

export function WithWss(path: string) {
  const devWss = "wss://preview-wss.tadle.com" + path;
  const prodWss = "wss://wss.tadle.com" + path;
  const wss = isProduction ? prodWss : devWss;
  return wss;
}

export const Paths = {
  // signIn: "/user/sign_in",
  markets: "/markets",
  offers: "/offers",
  entry: "/entry",
  offer: "/offer",
  orders: "/orders",
  holding: "/holding",

  myOffer: "/market_place/my_offer",
  myStock: "/market_place/my_stock",
  takerOrders: "/market_place/taker_orders",
  marketTrades: "/market_place/maker_trades_history",
  salesVolumeHistory: "/market_place/sales_volume_history",
  makerSettleAccount: "/market_place/direct_settle_account",

  taxIncome: "/user/tax_income",
  accountOverview: "/user/overview",
  makerOrders: "/user/maker_orders",
  userBalance: "/user/token_balance",
  userXpPoints: "/user/xp_points",
  tradingVol: "/user/trade_vol",
  userState: "/user/state",
  userName: "/user/user_name",

  tokenPrice: "/token/info",

  addTransaction: "/transaction/add",

  referral: {
    referer: "/referral/referer",
    create: "/referral/create",
    updateCommission: "/referral/update_commission",
    updateNote: "/referral/update_notes",
    default: "/referral/default",
    data: "/referral/referral_system_data",
    views: "/referral/views",
    delete: "/referral/delete",
    codeData: "/referral/referal_rate",
    extraRate: "/referral/referal_extra_rate",
  },
};
