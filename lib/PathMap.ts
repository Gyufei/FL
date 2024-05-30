export function WithHost(path: string) {
  const devHost = `https://preview-data.tadle.com`
  const prodHost = `https://data.tadle.com`
  const host = process.env.NODE_ENV === 'production' ? prodHost : devHost
  return `${host}${path}`
}

function WithCDN(path: string) {
  return `https://cdn-tadle.aggregation.top/images${path}`;
  // return `${process.env.NEXT_PUBLIC_CDN_URL}${path}`;
}

export function WithProjectCDN(path: string) {
  const goPath = path.endsWith(".png") ? path : `${path}.png`;
  return WithCDN(`/project/${goPath}`)
  // return `${process.env.NEXT_PUBLIC_CDN_URL}${path}`;
}

export function WithPointCDN(path: string) {
  const goPath = path.endsWith(".png") ? path : `${path}.png`;
  return WithCDN(`/point/${goPath}`)
  // return `${process.env.NEXT_PUBLIC_CDN_URL}${path}`;
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
