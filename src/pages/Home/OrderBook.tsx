import { Trans } from '@lingui/macro'
import dayjs from 'dayjs'

import { Box, Flex, Type } from 'theme/base'
import { formatNumber, formatRelativeShortDate } from 'utils/helpers/format'

export default function OrderBook() {
  return (
    <Box width={300}>
      <Flex sx={{ '& > *': { flexShrink: 0 } }}>
        <Type.Caption width="30%">
          <Trans>Time</Trans>
        </Type.Caption>
        <Type.Caption width="35%" textAlign="right">
          <Trans>Size</Trans>
        </Type.Caption>
        <Type.Caption width="35%" textAlign="right">
          <Trans>Price</Trans>
        </Type.Caption>
      </Flex>
      {Array.from({ length: 100 }, (_, v) => v)
        .map((v) => {
          return { time: dayjs().valueOf() - v * 300000, size: 123123, price: 123123 }
        })
        .map((value, index) => {
          return (
            <Flex key={index} sx={{ '& > *': { flexShrink: 0 } }}>
              <Type.Caption width="30%">{formatRelativeShortDate(value.time)}</Type.Caption>
              <Type.Caption width="35%" textAlign="right">
                {formatNumber(value.size)}
              </Type.Caption>
              <Type.Caption width="35%" textAlign="right">
                {formatNumber(value.price)}
              </Type.Caption>
            </Flex>
          )
        })}
    </Box>
  )
}
