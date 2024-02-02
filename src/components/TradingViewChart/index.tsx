import { useEffect } from 'react'

import useTVDatafeed from 'hooks/helpers/useTVDatafeed'
import { themeColors } from 'theme/colors'

import { ResolutionString } from '../../../public/tradingview/charting_library'

const chartingLibraryPath = '/tradingview/charting_library/'

function TradingViewChart() {
  const { datafeed } = useTVDatafeed({ tokenSymbol: 'ETHUSD' })

  useEffect(() => {
    const container = document.getElementById('tv_chart_container')
    if (typeof window !== 'undefined' && window.TradingView && container) {
      // @ts-ignore
      const widget = new window.TradingView.widget({
        container: 'tv_chart_container',
        locale: 'en',
        library_path: chartingLibraryPath,
        datafeed,
        symbol: 'ETHUSD',
        interval: '1H' as ResolutionString,
        fullscreen: false,
        debug: false,
        enabled_features: ['show_exchange_logos'],
        theme: 'Dark',
        overrides: {
          'paneProperties.background': '#110F23',
        },
        autosize: true,
        height: 300,
      })
      widget.onChartReady(() => {
        const chart = widget.chart()
        chart.getSeries().setChartStyleProperties(1, {
          upColor: themeColors.green1,
          downColor: themeColors.red1,
          borderUpColor: themeColors.green1,
          borderDownColor: themeColors.red1,
          wickUpColor: themeColors.green1,
          wickDownColor: themeColors.red1,
        })
      })
    }
  }, [])

  return <div id="tv_chart_container" style={{ height: '60vh' }} />
}

export default TradingViewChart
