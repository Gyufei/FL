export const isPreview = process.env.NEXT_PUBLIC_IS_PREVIEW === '1'
export const isProduction = process.env.NODE_ENV === 'production' && !isPreview

export function WithHost(path: string) {
  const devHost = `https://preview-api.tadle.com`
  const prodHost = `https://api.tadle.com`
  const host = isProduction ? prodHost : devHost
  return `${host}${path}`
}

function WithCDN(path: string) {
  const devCDN = `https://preview-cdn.tadle.com`
  const prodCDN = `https://cdn.tadle.com`
  const cdn = isProduction ? prodCDN : devCDN
  return `${cdn}${path}`;
}

export function WithProjectCDN(path: string) {
  const goPath = path.endsWith(".png") ? path : `${path}.png`;
  return WithCDN(`/images/project/${goPath}`)
}

export function WithPointCDN(path: string) {
  const goPath = path.endsWith(".png") ? path : `${path}.png`;
  return WithCDN(`/images/point/${goPath}`)
}

export function WithWss() {
  const devWss = "preview-wss.tadle.com";
  const prodWss = "wss://wss.tadle.com";
  const wss = isProduction ? prodWss : devWss
  return wss;
}

export const EndPointPathMap = {
  solanaApi: WithHost(""),
  solanaToken: WithCDN("/tokens/solana/tokenlist.json"),
};

export const Paths = {
  signIn: "/user/sign_in",
  offer: "/market_place/offer",
  stock: "/market_place/stock",
  myOffer: "/market_place/my_offer",
  myStock: "/market_place/my_stock",
  makerDetail: "/market_place/maker_detail",
  marketPlace: "/market_place",
  addTransaction: "/transaction/add",
  taxIncome: "/user/tax_income",
  takerOrders: "/market_place/taker_orders",
  accountOverview: "/user/overview",
  makerOrders: "/user/maker_orders",
  userBalance: "/user/token_balance",
  tradingVol: "/user/trade_vol",
  marketTrades: "/market_place/maker_trades_history",
  userState: "/user/state",
  sales_volume_history: "/market_place/sales_volume_history",
  makerSettleAccount: '/market_place/direct_settle_account'
};
