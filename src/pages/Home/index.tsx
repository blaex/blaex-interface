import { useResponsive } from 'ahooks'

import CustomPageTitle from 'components/@ui/CustomPageTitle'
import { Box, Flex } from 'theme/base'

import OrderBook from './OrderBook'
import PlaceOrderForm from './PlaceOrderForm'
import PositionManagement from './PositionManagement'

export default function HomePage() {
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
      <Box p={2} sx={{ minHeight: '100%', width: '100%', maxWidth: 2000, mx: 'auto' }}>
        <Box mb={2} sx={{ bg: 'background2', height: 80 }}>
          Market Stats
        </Box>
        <Flex sx={{ width: '100%', gap: 2, overflow: 'hidden' }}>
          <Box flex="1">
            <Flex sx={{ gap: 2, height: 570 }}>
              <Box flex="1" sx={{ bg: 'background2' }}>
                Chart
              </Box>
              <Box sx={{ width: 300, height: '100%', overflow: 'auto', flexShrink: 0, bg: 'background2' }}>
                <OrderBook />
              </Box>
            </Flex>
            <Box sx={{ height: 300, flexShrink: 0 }}>
              <PositionManagement />
            </Box>
          </Box>
          <Box sx={{ width: 400, flexShrink: 0 }}>
            <PlaceOrderForm />
          </Box>
        </Flex>
      </Box>
    </>
  )
}
