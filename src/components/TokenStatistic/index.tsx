import { Trans } from '@lingui/macro'
import { ReactNode } from 'react'

import { SignedText } from 'components/@ui/DecoratedText/SignedText'
import { use24hPriceDelta } from 'hooks/helpers/use24PriceDelta'
import useUsdPrices from 'hooks/store/useUsdPrices'
import { Flex, Type } from 'theme/base'
import { BoxProps } from 'theme/types'
import { formatNumber } from 'utils/helpers/format'

export default function TokenStatistics() {
  const { prices } = useUsdPrices()
  const { priceDelta } = use24hPriceDelta('ETHUSD')

  return (
    <Flex py={3} sx={{ gap: 4 }}>
      <Type.Large mr={3}>ETH/USD</Type.Large>
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
      <Type.Caption color="neutral5">{title}</Type.Caption>
      <Type.Body>{value}</Type.Body>
    </Flex>
  )
}
