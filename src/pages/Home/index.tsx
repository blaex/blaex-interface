import { useResponsive } from 'ahooks'

import CustomPageTitle from 'components/@ui/CustomPageTitle'
import { Box, Flex } from 'theme/base'

import OrderBook from './OrderBook'
import PlaceOrderForm from './PlaceOrderForm'
import PositionManagement from './PositionManagement'

export default function HomePage() {
  const { md } = useResponsive()
  return (
    <>
      <CustomPageTitle title="Blaex" />
      <Flex p={2} sx={{ flexDirection: 'column', minHeight: '100%' }}>
        <Box mb={2} sx={{ bg: 'background2', height: 80 }}>
          Market Stats
        </Box>
        <Flex flex="1 0 0" sx={{ width: '100%', gap: 2 }}>
          <Flex flex="1 0 0" sx={{ flexDirection: 'column', gap: 2 }}>
            <Flex flex="1 0 0" sx={{ gap: 2 }}>
              <Box flex="1 0 0" sx={{ bg: 'background2' }}>
                Chart
              </Box>
              <Box sx={{ width: 300, flexShrink: 0, bg: 'background2' }}>
                <OrderBook />
              </Box>
            </Flex>
            <Box sx={{ height: 300, flexShrink: 0 }}>
              <PositionManagement />
            </Box>
          </Flex>
          <Box sx={{ width: 400, flexShrink: 0 }}>
            <PlaceOrderForm />
          </Box>
        </Flex>
      </Flex>
    </>
  )
}
