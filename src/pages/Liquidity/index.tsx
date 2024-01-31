import { Trans } from '@lingui/macro'
import { ArrowsDownUp } from '@phosphor-icons/react'
import { ReactNode, useState } from 'react'

import CustomPageTitle from 'components/@ui/CustomPageTitle'
import Divider from 'components/@ui/Divider'
import Dropdown, { DropdownItem } from 'theme/Dropdown'
import Input from 'theme/Input'
import { Box, Flex, Image, Type } from 'theme/base'
import { generateClipPath } from 'utils/helpers/css'
import { formatNumber } from 'utils/helpers/format'

export default function LiquidityPage() {
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
const CURRENCY_OPTIONS = [{ symbol: 'ETH' }, { symbol: 'BTC' }]
function Form() {
  const [currentTab, setTab] = useState(TABS[0])
  const [currentCurrency, setCurrency] = useState(CURRENCY_OPTIONS[0])
  const isBuy = currentTab.value === TABS[0].value
  return (
    <Box>
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
                bg: isActive ? 'neutral1' : 'transparent',
                color: isActive ? 'neutral8' : 'neutral4',
                textAlign: 'center',
                clipPath: generateClipPath({ type: '1tr' }),
                transition: '0.3s',
              }}
              onClick={() => setTab(tab)}
            >
              {tab.label}
            </Box>
          )
        })}
      </Flex>
      <Box variant="cardPolygon" sx={{ bg: 'neutral7' }}>
        <Flex sx={{ gap: 2 }}>
          <Box>
            <Type.Body>Pay</Type.Body>
            <Input
              placeholder="0.0"
              sx={{
                border: 'none',
                bg: 'transparent',
                p: 0,
                input: { fontSize: 32, lineHeight: '40px' },
                'input::placeholder': { color: 'neutral5' },
              }}
            />
          </Box>
          {isBuy ? (
            <CurrencyDropdown
              currentCurrency={currentCurrency}
              onChangeCurrency={(option: any) => setCurrency(option)}
            />
          ) : (
            <BLIBalance />
          )}
        </Flex>
      </Box>
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
      <Box variant="cardPolygon" sx={{ bg: 'neutral7' }}>
        <Flex sx={{ gap: 2 }}>
          <Box flex="1">
            <Type.Body>Receive</Type.Body>
            <Type.H3 color="neutral5" sx={{ fontWeight: 'normal' }}>
              32
            </Type.H3>
          </Box>
          {isBuy ? (
            <BLIBalance />
          ) : (
            <CurrencyDropdown
              currentCurrency={currentCurrency}
              onChangeCurrency={(option: any) => setCurrency(option)}
            />
          )}
        </Flex>
      </Box>
    </Box>
  )
}

function BLIBalance() {
  return (
    <Box sx={{ flexShrink: 0 }}>
      <Type.Body>Balance</Type.Body>
      <Flex sx={{ gap: 2, height: 40, alignItems: 'center' }}>
        <Box sx={{ width: 32, height: 32, bg: 'neutral1' }} />
        <Type.H5 sx={{ fontWeight: 'normal' }}>BLI</Type.H5>
      </Flex>
    </Box>
  )
}

function CurrencyDropdown({ currentCurrency, onChangeCurrency }: { currentCurrency: any; onChangeCurrency: any }) {
  return (
    <Box sx={{ flexShrink: 0 }}>
      <Type.Body>Balance</Type.Body>
      <Dropdown
        sx={{ p: 0 }}
        buttonSx={{ p: 0, border: 'none', height: 40 }}
        menu={
          <>
            {CURRENCY_OPTIONS.map((option, index) => {
              return (
                <DropdownItem key={index} onClick={() => onChangeCurrency(option)}>
                  <Flex>
                    <Image src={`/svg/markets/${option.symbol}.svg`} width={32} height={32} />
                    <Type.H5>{option.symbol}</Type.H5>
                  </Flex>
                </DropdownItem>
              )
            })}
          </>
        }
      >
        <Flex sx={{ gap: 2 }}>
          <Image src={`/svg/markets/${currentCurrency.symbol}.svg`} width={32} height={32} />
          <Type.H5 sx={{ fontWeight: 'normal' }}>{currentCurrency.symbol}</Type.H5>
        </Flex>
      </Dropdown>
    </Box>
  )
}
