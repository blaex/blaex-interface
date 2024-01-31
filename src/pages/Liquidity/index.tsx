import { Trans } from '@lingui/macro'
import { ReactNode } from 'react'

import CustomPageTitle from 'components/@ui/CustomPageTitle'
import Divider from 'components/@ui/Divider'
import { Box, Flex, Type } from 'theme/base'
import { formatNumber } from 'utils/helpers/format'

export default function Liquidity() {
  return (
    <>
      <CustomPageTitle title="Blaex" />
      <Box sx={{ width: '100%', maxWidth: 1000, mx: 'auto' }}>
        <Type.H1 mb={2}>
          <Trans>Liquidity</Trans>
        </Type.H1>
        <Type.Body color="neutral5" mb={24}>
          <Trans>Purchase BLI tokens to earn ETH fees from swaps and leverage trading.</Trans>
        </Type.Body>
        <Flex sx={{ width: '100%', gap: 2, '& > *': { flex: 1 } }}>
          <Box sx={{ bg: 'background2', borderRadius: 'sm', p: 3 }}>
            <Flex sx={{ alignItems: 'center', gap: 3 }}>
              <Box sx={{ width: 48, height: 48, flexShrink: 0, bg: 'neutral1' }} />
              <Box>
                <Type.Body>BLI</Type.Body>
                <Type.Caption color="neutral5">
                  <Trans>Blaex Liquidity Index</Trans>
                </Type.Caption>
              </Box>
            </Flex>
            <Divider my={3} />
            <Stats label={<Trans>Price</Trans>} value={`$${formatNumber(1.112)}`} />
            <Box mb={2} />
            <Stats
              label={<Trans>Total Supply</Trans>}
              value={`${formatNumber(123123123)}($${formatNumber(123123123)})`}
            />
            <Divider my={3} />
            <Stats label={<Trans>Protocol Yield APR</Trans>} value={`${formatNumber(12.33)}%`} />
            <Box mb={2} />
            <Stats label={<Trans>Blast Native Yield APR</Trans>} value={`${formatNumber(12.33)}%`} />
          </Box>
        </Flex>
      </Box>
    </>
  )
}

function Stats({ label, value }: { label: ReactNode; value: ReactNode }) {
  return (
    <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
      <Type.Caption color="neutral4">{label}</Type.Caption>
      <Type.CaptionBold>{value}</Type.CaptionBold>
    </Flex>
  )
}
