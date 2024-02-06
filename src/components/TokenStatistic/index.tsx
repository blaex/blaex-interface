import { Trans } from '@lingui/macro'
import { ReactNode } from 'react'

import { SignedText } from 'components/@ui/DecoratedText/SignedText'
import TokenWrapper from 'components/@ui/TokenWrapper'
import { use24hPriceDelta } from 'hooks/helpers/use24PriceDelta'
import useUsdPrices from 'hooks/store/useUsdPrices'
import { Flex, Type } from 'theme/base'
import { BoxProps } from 'theme/types'
import { formatNumber } from 'utils/helpers/format'

export default function TokenStatistics() {
  const { prices } = useUsdPrices()
  const { priceDelta } = use24hPriceDelta('ETHUSD')

  return (
    <Flex p={2} sx={{ gap: 4 }}>
      <Flex alignItems="center" sx={{ gap: 2 }}>
        <TokenWrapper symbol="ETH" hasText={false} />
        <Type.Large mr={3}>ETH/USD</Type.Large>
      </Flex>

      <StatisticItem
        width={85}
        title={<Trans>Market Price</Trans>}
        value={`$${formatNumber(prices['ETHUSD'], 2, 2)}`}
      />
      <StatisticItem width={85} title={<Trans>Index Price</Trans>} value={`$${formatNumber(prices['ETHUSD'], 2, 2)}`} />
      <StatisticItem
        title={<Trans>24h Change</Trans>}
        value={<SignedText value={priceDelta?.deltaPercentage} suffix={'%'} showPlus fontInherit />}
      />
      <StatisticItem title={<Trans>24h High</Trans>} value={`$${formatNumber(priceDelta?.high, 2, 2)}`} />
      <StatisticItem title={<Trans>24h Low</Trans>} value={`$${formatNumber(priceDelta?.low, 2, 2)}`} />
    </Flex>
  )
}

function StatisticItem({ title, value, ...props }: { title: ReactNode; value: ReactNode } & BoxProps) {
  return (
    <Flex flexDirection="column" {...props}>
      <Type.Small color="neutral5">{title}</Type.Small>
      <Type.Caption>{value}</Type.Caption>
    </Flex>
  )
}
