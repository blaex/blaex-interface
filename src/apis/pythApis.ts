import pythRequester from './pyth'

export async function getPriceHistories({
  symbol,
  resolution,
  from,
  to,
}: {
  symbol: string
  resolution: string
  from: number
  to: number
}) {
  return pythRequester.get(`/history`, { params: { symbol, resolution, from, to } }).then((res: any) => res.data)
}

export async function getSymbolInfos() {
  return pythRequester.get(`/symbol_info`).then((res: any) => res.data)
}
