import { Trans } from '@lingui/macro'
import { ArrowsDownUp } from '@phosphor-icons/react'
import { ReactNode, useState } from 'react'

import CustomPageTitle from 'components/@ui/CustomPageTitle'
import Divider from 'components/@ui/Divider'
import NumberInput from 'components/NumberInput'
import { parseInputValue } from 'components/NumberInput/helpers'
import { Button } from 'theme/Buttons'
import { Box, Flex, Image, Type } from 'theme/base'
import { generateClipPath } from 'utils/helpers/css'
import { formatNumber } from 'utils/helpers/format'

export default function LiquidityPage() {
  return (
    <>
      <CustomPageTitle title="Blaex" />
      <Box sx={{ width: '100%', maxWidth: 1000, mx: 'auto' }}>
        <Box height={48} />
        <Type.H1 mb={2}>
          <Trans>Liquidity</Trans>
        </Type.H1>
        <Type.Body color="neutral5" mb={24}>
          <Trans>Purchase BLI tokens to earn ETH fees from swaps and leverage trading.</Trans>
        </Type.Body>
        <Flex sx={{ width: '100%', gap: 2, '& > *': { flex: 1 }, alignItems: 'start' }}>
          <Overview />
          <Form />
        </Flex>
      </Box>
    </>
  )
}

function Overview() {
  return (
    <Box sx={{ bg: 'background2', borderRadius: 'sm', p: 3 }}>
      <Flex sx={{ alignItems: 'center', gap: 3 }}>
        <Box sx={{ width: 48, height: 48, flexShrink: 0, bg: 'neutral1' }} />
        <Box>
          <Type.Body sx={{ display: 'block' }}>BLI</Type.Body>
          <Type.Caption color="neutral5">
            <Trans>Blaex Liquidity Index</Trans>
          </Type.Caption>
        </Box>
      </Flex>
      <Divider my={3} />
      <Stats label={<Trans>Price</Trans>} value={`$${formatNumber(1.112)}`} />
      <Box mb={2} />
      <Stats label={<Trans>Total Supply</Trans>} value={`${formatNumber(123123123)}($${formatNumber(123123123)})`} />
      <Divider my={3} />
      <Stats label={<Trans>Protocol Yield APR</Trans>} value={`${formatNumber(12.33)}%`} />
      <Box mb={2} />
      <Stats label={<Trans>Blast Native Yield APR</Trans>} value={`${formatNumber(12.33)}%`} />
    </Box>
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

const TABS = [
  { label: 'Buy BLI', value: 'buy' },
  { label: 'Sell BLI', value: 'sell' },
]
type TabOption = (typeof TABS)[0]
const DEFAULT_TAB = TABS[0]

function Form() {
  const [currentTab, setTab] = useState(DEFAULT_TAB)
  const [amount, setAmount] = useState<string | undefined>(undefined)
  const pAmount = parseInputValue(amount)
  const isBuy = currentTab.value === DEFAULT_TAB.value
  return (
    <Box>
      <TabHeader currentTab={currentTab} onChangeTab={(option) => setTab(option)} />
      <Box variant="cardPolygon" sx={{ bg: 'neutral7' }}>
        <Flex sx={{ gap: 2 }}>
          <Box>
            <Type.Body mb={3}>Pay</Type.Body>
            <NumberInput placeholder="0.0" value={amount} onValueChange={(e) => setAmount(e.target.value)} />
          </Box>
          {isBuy ? <USDBToken /> : <BLIToken />}
        </Flex>
      </Box>
      <ArrowSymbol />
      <Box mb={3} variant="cardPolygon" sx={{ bg: 'neutral7' }}>
        <Flex sx={{ gap: 2 }}>
          <Box flex="1">
            <Type.Body mb={3}>Receive</Type.Body>
            <Type.H3 color="neutral5" sx={{ fontWeight: 'normal' }}>
              32
            </Type.H3>
          </Box>
          {isBuy ? <BLIToken /> : <USDBToken />}
        </Flex>
      </Box>
      <SubmitButton text={isBuy ? <Trans>Buy</Trans> : <Trans>Sell</Trans>} onSubmit={() => console.log(1)} />
    </Box>
  )
}
function TabHeader({ currentTab, onChangeTab }: { currentTab: TabOption; onChangeTab: (option: TabOption) => void }) {
  return (
    <Flex mb={3} sx={{ borderBottom: 'small', borderBottomColor: 'neutral1', '& > *': { flex: 1 } }}>
      {TABS.map((tab) => {
        const isActive = currentTab.value === tab.value
        return (
          <Box
            key={tab.value}
            role="button"
            sx={{
              height: 48,
              lineHeight: '48px',
              fontWeight: 600,
              bg: isActive ? 'neutral1' : 'transparent',
              color: isActive ? 'neutral8' : 'neutral4',
              textAlign: 'center',
              clipPath: generateClipPath({ type: '1tr' }),
              transition: '0.3s',
            }}
            onClick={() => onChangeTab(tab)}
          >
            {tab.label}
          </Box>
        )
      })}
    </Flex>
  )
}

function USDBToken() {
  return (
    <Box sx={{ flexShrink: 0 }}>
      <Type.Body mb={3}>Balance</Type.Body>
      <Flex sx={{ gap: 2, height: 40, alignItems: 'center' }}>
        <TokenWrapper symbol="ETH" />
      </Flex>
    </Box>
  )
}
function BLIToken() {
  return (
    <Box sx={{ flexShrink: 0 }}>
      <Type.Body mb={3}>Balance</Type.Body>
      <Flex sx={{ gap: 2, height: 40, alignItems: 'center' }}>
        <TokenWrapper symbol="ETH" />
      </Flex>
    </Box>
  )
}
function TokenWrapper({ symbol }: { symbol: string }) {
  return (
    <Flex sx={{ gap: 2 }}>
      <Image src={`/svg/markets/${symbol}.svg`} width={32} height={32} />
      <Type.H5 sx={{ fontWeight: 'normal' }}>{symbol}</Type.H5>
    </Flex>
  )
}

function SubmitButton({ text, onSubmit }: { text: ReactNode; onSubmit: () => void }) {
  return (
    <Button
      variant="primary"
      sx={{
        width: '100%',
        height: 50,
        border: 'none',
        borderRadius: 0,
      }}
      onClick={onSubmit}
    >
      {text}
    </Button>
  )
}

function ArrowSymbol() {
  return (
    <Flex sx={{ height: 16, alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
      <Box
        sx={{
          bg: 'primary1',
          p: 2,
          height: 40,
          width: 40,
          color: 'neutral8',
          clipPath: generateClipPath({ diffX: 16, diffY: 8 }),
        }}
      >
        <ArrowsDownUp size={24} />
      </Box>
    </Flex>
  )
}
