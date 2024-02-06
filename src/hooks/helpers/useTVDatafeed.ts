import { useMemo } from 'react'

import { useRealtimeUsdPricesStore } from '../store/useUsdPrices'
import useTVStreaming from './useTVStreaming'

const API_ENDPOINT = 'https://benchmarks.pyth.network/v1/shims/tradingview'
// Use it to keep a record of the most recent bar on the chart
const lastBarsCache = new Map()

export default function useTVDatafeed({ tokenSymbol }: { tokenSymbol?: string }) {
  const { setIsReady } = useRealtimeUsdPricesStore()
  const { subscribeOnStream, unsubscribeFromStream } = useTVStreaming({ tokenSymbol })

  return useMemo(() => {
    return {
      datafeed: {
        onReady: (callback: any) => {
          // console.log('[onReady]: Method call')
          fetch(`${API_ENDPOINT}/config`).then((response) => {
            response.json().then((configurationData) => {
              setTimeout(() => callback(configurationData))
            })
          })
        },
        searchSymbols: (userInput: any, exchange: any, symbolType: any, onResultReadyCallback: any) => {
          // console.log('[searchSymbols]: Method call')
          fetch(`${API_ENDPOINT}/search?query=${userInput}`).then((response) => {
            response.json().then((data) => {
              onResultReadyCallback(data)
            })
          })
        },
        resolveSymbol: (symbolName: any, onSymbolResolvedCallback: any, onResolveErrorCallback: any) => {
          // console.log('[resolveSymbol]: Method call', symbolName)
          fetch(`${API_ENDPOINT}/symbols?symbol=${symbolName}`).then((response) => {
            response
              .json()
              .then((symbolInfo) => {
                // console.log('[resolveSymbol]: Symbol resolved', symbolInfo)
                onSymbolResolvedCallback({ ...symbolInfo, pricescale: 100, description: 'ETH / USD (Blaex)' })
              })
              .catch((error) => {
                // console.log('[resolveSymbol]: Cannot resolve symbol', symbolName)
                onResolveErrorCallback('Cannot resolve symbol')
                return
              })
          })
        },
        getBars: (
          symbolInfo: any,
          resolution: any,
          periodParams: any,
          onHistoryCallback: any,
          onErrorCallback: any
        ) => {
          const { from, to, firstDataRequest } = periodParams
          // console.log('[getBars]: Method call', symbolInfo, resolution, from, to)
          fetch(
            `${API_ENDPOINT}/history?symbol=${symbolInfo.ticker}&from=${periodParams.from}&to=${periodParams.to}&resolution=${resolution}`
          ).then((response) => {
            response
              .json()
              .then((data) => {
                setIsReady(true)

                if (data.t.length === 0) {
                  onHistoryCallback([], { noData: true })
                  return
                }
                const bars = []
                for (let i = 0; i < data.t.length; ++i) {
                  bars.push({
                    time: data.t[i] * 1000,
                    low: data.l[i],
                    high: data.h[i],
                    open: data.o[i],
                    close: data.c[i],
                  })
                }
                if (firstDataRequest) {
                  lastBarsCache.set(symbolInfo.ticker, {
                    ...bars[bars.length - 1],
                  })
                }
                onHistoryCallback(bars, { noData: false })
              })
              .catch((error) => {
                // console.log('[getBars]: Get error', error)
                onErrorCallback(error)
              })
          })
        },
        subscribeBars: (
          symbolInfo: any,
          resolution: any,
          onRealtimeCallback: any,
          subscriberUID: any,
          onResetCacheNeededCallback: any
        ) => {
          // console.log('[subscribeBars]: Method call with subscriberUID:', subscriberUID)
          subscribeOnStream(
            symbolInfo,
            resolution,
            onRealtimeCallback,
            subscriberUID,
            onResetCacheNeededCallback,
            lastBarsCache.get(symbolInfo.ticker)
          )
        },
        unsubscribeBars: (subscriberUID: any) => {
          // console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID)
          unsubscribeFromStream(subscriberUID)

          setIsReady(false)
        },
      },
    }
  }, [setIsReady, subscribeOnStream, unsubscribeFromStream])
}
