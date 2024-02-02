import { Trans } from '@lingui/macro'
import { useState } from 'react'

import { Button } from 'theme/Buttons'
import { Box, Flex } from 'theme/base'

import PositionHistory from './PositionHistory'

const TABS = [
  { label: <Trans>Positions</Trans>, value: 'open-positions' },
  { label: <Trans>Open Orders</Trans>, value: 'open-orders' },
  { label: <Trans>Orders History</Trans>, value: 'orders-history' },
  { label: <Trans>Trades History</Trans>, value: 'trades-history' },
  { label: <Trans>Positions History</Trans>, value: 'positions-history' },
]
const DEFAULT_TAB = TABS[0]
type TabOption = typeof DEFAULT_TAB
export default function PositionManagement() {
  const [currentTab, setTab] = useState(DEFAULT_TAB)
  return (
    <Flex sx={{ flexDirection: 'column', width: '100%', height: '100%' }}>
      <Box sx={{ height: 56, position: 'relative' }}>
        <Tabs currentTab={currentTab} onChangeTab={(_option) => setTab(_option)} />
      </Box>

      <Box flex="1 0 0" sx={{ bg: 'background2', borderTop: 'small', borderTopColor: 'stroke', mt: '-1px' }}>
        <PositionHistory />
      </Box>
    </Flex>
  )
}

function Tabs({ currentTab, onChangeTab }: { currentTab: TabOption; onChangeTab: (option: TabOption) => void }) {
  return (
    <Flex mb={3} sx={{ height: '100%', gap: 24 }}>
      {TABS.map((tab) => {
        const isActive = currentTab.value === tab.value
        return (
          <Button
            variant="ghost"
            key={tab.value}
            onClick={() => onChangeTab(tab)}
            sx={{
              height: '100%',
              borderRadius: 0,
              fontSize: '16px',
              fontWeight: 'normal',
              ...(isActive
                ? { color: 'neutral1', borderBottom: 'small', borderBottomColor: 'neutral1' }
                : { color: 'neutral5' }),
            }}
          >
            {tab.label}
          </Button>
        )
      })}
    </Flex>
  )
}
