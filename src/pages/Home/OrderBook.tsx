import { Trans } from '@lingui/macro'
import dayjs from 'dayjs'

import { Box, Flex, Type } from 'theme/base'
import { formatNumber, formatRelativeShortDate } from 'utils/helpers/format'

export default function OrderBook() {
  return (
    <Box width="100%" p={3}>
      <Flex sx={{ '& > *': { flexShrink: 0 } }} mb={2} color="neutral5">
        <Type.Small width="30%">
          <Trans>Time</Trans>
        </Type.Small>
        <Type.Small width="35%" textAlign="right">
          <Trans>Size</Trans>
        </Type.Small>
        <Type.Small width="35%" textAlign="right">
          <Trans>Price</Trans>
        </Type.Small>
      </Flex>
      {Array.from({ length: 100 }, (_, v) => v)
        .map((v) => {
          return { time: dayjs().valueOf() - v * 300000, size: 123123, price: 123123 }
        })
        .map((value, index) => {
          return (
            <Flex key={index} mb={10} sx={{ '& > *': { flexShrink: 0 } }}>
              <Type.Small width="30%">{formatRelativeShortDate(value.time)}</Type.Small>
              <Type.Small width="35%" textAlign="right">
                {formatNumber(value.size)}
              </Type.Small>
              <Type.Small width="35%" textAlign="right">
                {formatNumber(value.price)}
              </Type.Small>
            </Flex>
          )
        })}
    </Box>
  )
}
