import { useResponsive } from 'ahooks'

import CustomPageTitle from 'components/@ui/CustomPageTitle'
import useRequiredChain from 'hooks/web3/useRequiredChain'
import { Box, Flex } from 'theme/base'

import OrderBook from './OrderBook'
import PlaceOrderForm from './PlaceOrderForm'
import PositionManagement from './PositionManagement'

export default function HomePage() {
  const { isValid, alert } = useRequiredChain()
  const { xl } = useResponsive()
  if (!xl)
    return (
      <Box p={5} textAlign="center">
        Only support large monitor
      </Box>
    )
  return (
    <>
      <CustomPageTitle title="Blaex" />
      <Box p={2} sx={{ height: '100%', width: '100%', maxWidth: 2000, mx: 'auto', overflow: 'hidden' }}>
        <Box mb={2} sx={{ bg: 'background2', height: 80 }}>
          Market Stats
        </Box>
        <Flex sx={{ width: '100%', gap: 2, overflow: 'hidden', height: 'calc(100% - 80px)' }}>
          <Box flex="1" sx={{ height: '100%' }}>
            <Flex sx={{ gap: 2, height: '65%' }}>
              <Box flex="1" sx={{ bg: 'background2' }}>
                Chart
              </Box>
              <Box sx={{ width: 300, height: '100%', overflow: 'auto', flexShrink: 0, bg: 'background2' }}>
                <OrderBook />
              </Box>
            </Flex>
            <Box sx={{ height: '35%', flexShrink: 0, pb: 2 }}>
              <PositionManagement />
            </Box>
          </Box>

          <Box sx={{ width: 400, flexShrink: 0 }}>{isValid ? <PlaceOrderForm /> : alert}</Box>
        </Flex>
      </Box>
    </>
  )
}
