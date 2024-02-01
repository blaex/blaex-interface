export interface TokenTrade {
  id: string
  name: string
  symbol: string
  decimals: number
  priceFeedId: string
  // icon: string
}

export type TokenOptionProps = {
  id: string
  label: string
  value: string
}

const TOKEN_TRADES: { [key: string]: TokenTrade } = {
  BTC: {
    id: '0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43',
    name: 'BTC',
    symbol: 'BTC',
    decimals: 8,
    priceFeedId: '0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43',
  },
  ETH: {
    id: '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace',
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
    priceFeedId: '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace',
  },
}
export const getTokenTradeList = () => Object.values(TOKEN_TRADES)

export const getDefaultTokenTrade = () => Object.values(TOKEN_TRADES)[0]

export const getTokenOptions = () =>
  Object.keys(TOKEN_TRADES).map((key) => ({
    id: key,
    label: TOKEN_TRADES[key].symbol,
    value: key,
  }))

export const TIMEFRAME_NAMES = {
  // Minutes
  5: 'M5',
  15: 'M15',
  30: 'M30',
  60: 'H1',
  240: 'H4',
  1440: 'D1',
}
