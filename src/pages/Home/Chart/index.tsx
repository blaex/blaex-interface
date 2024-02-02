import TokenStatistics from 'components/TokenStatistic'
import TradingViewChart from 'components/TradingViewChart'
import { Box } from 'theme/base'

export default function Chart() {
  return (
    <Box>
      <TokenStatistics />
      <TradingViewChart />
    </Box>
  )
}
