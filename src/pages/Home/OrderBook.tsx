import { Trans } from '@lingui/macro'
import { useQuery } from 'react-query'

import { getOrders } from 'apis/tradeApis'
import { Box, Flex, Type } from 'theme/base'
import { formatNumber, formatRelativeShortDate } from 'utils/helpers/format'

export default function OrderBook() {
  const { data } = useQuery('market-orders', () => getOrders())
  return (
    <Box width="100%" p={3}>
      <Flex sx={{ '& > *': { flexShrink: 0 } }} mb={2} color="neutral5">
        <Type.Small width="30%">
          <Trans>Time</Trans>
        </Type.Small>
        <Type.Small width="35%" textAlign="right">
          <Trans>Size (USD)</Trans>
        </Type.Small>
        <Type.Small width="35%" textAlign="right">
          <Trans>Price (USD)</Trans>
        </Type.Small>
      </Flex>
      {!!data &&
        data.map((value, index) => {
          return (
            <Flex key={index} mb={10} sx={{ '& > *': { flexShrink: 0 } }}>
              <Type.Small width="30%">{formatRelativeShortDate(value.blockTime)}</Type.Small>
              <Type.Small width="35%" textAlign="right" color={value.isLong ? 'system2' : 'system1'}>
                {formatNumber(value.sizeDeltaUsd, 2, 2)}
              </Type.Small>
              <Type.Small width="35%" textAlign="right">
                {formatNumber(value.executionPrice, 2, 2)}
              </Type.Small>
            </Flex>
          )
        })}
    </Box>
  )
}
