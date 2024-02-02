import { Trans } from '@lingui/macro'
import { ReactNode, useState } from 'react'

import { DifferentialBar } from 'components/@ui/DifferentialBar'
import NumberInput from 'components/NumberInput'
import { parseInputValue } from 'components/NumberInput/helpers'
import { Button } from 'theme/Buttons'
import { Box, Flex, Type } from 'theme/base'
import { formatNumber } from 'utils/helpers/format'

const PRICE_TRIGGER_OPTIONS = [
  { label: <Trans>Market</Trans>, value: 'market' },
  { label: <Trans>Limit</Trans>, value: 'limit' },
  { label: <Trans>Trigger</Trans>, value: 'trigger' },
]
const DEFAULT_PRICE_TRIGGER_OPTION = PRICE_TRIGGER_OPTIONS[0]
type PriceTriggerOptionType = typeof DEFAULT_PRICE_TRIGGER_OPTION
export default function PlaceOrderForm() {
  const [priceTriggerOption, setPriceTriggerOption] = useState(DEFAULT_PRICE_TRIGGER_OPTION)
  const onChangePriceTriggerOption = (_option: PriceTriggerOptionType) => setPriceTriggerOption(_option)

  const [amount, setAmount] = useState<string | undefined>()
  const pAmount = parseInputValue(amount)
  const onChangeAmount = (_amount: string | undefined) => setAmount(_amount)

  const [leverage, setLeverage] = useState<string | number | undefined>(DEFAULT_LEVERAGE)
  const onChangeLeverage = (_leverage: string | undefined) => setLeverage(_leverage)
  const pLeverage = parseInputValue(leverage)

  return (
    <Box maxWidth={400} sx={{ p: 3, border: 'sm', bg: 'background2' }}>
      <PriceTriggerOption currentOption={priceTriggerOption} onChangeOption={onChangePriceTriggerOption} />
      <AmountInput amount={amount} onChangeAmount={onChangeAmount} />
      <LeverageInput leverage={leverage} onChangeLeverage={onChangeLeverage} />
      <Summary amount={pAmount} leverage={pLeverage} />
      <Buttons amount={pAmount} leverage={pLeverage} />
      <MarketStats />
    </Box>
  )
}

function PriceTriggerOption({
  currentOption,
  onChangeOption,
}: {
  currentOption: PriceTriggerOptionType
  onChangeOption: (option: PriceTriggerOptionType) => void
}) {
  return (
    <Flex mb={3} sx={{ gap: 24 }}>
      {PRICE_TRIGGER_OPTIONS.map((option) => {
        const isActive = currentOption.value === option.value
        return (
          <Button
            variant="ghost"
            key={option.value}
            onClick={() => onChangeOption(option)}
            sx={{
              fontSize: '16px',
              fontWeight: 'normal',
              ...(isActive ? { color: 'neutral1' } : { color: 'neutral5' }),
            }}
          >
            {option.label}
          </Button>
        )
      })}
    </Flex>
  )
}

const QUICK_SET_AMOUNT_OPTIONS = [10, 25, 50, 75, 100]
function AmountInput({
  amount,
  onChangeAmount,
}: {
  amount: string | undefined
  onChangeAmount: (amount: string | undefined) => void
}) {
  const balance = 1000
  return (
    <Box mb={3} variant="cardPolygon" sx={{ bg: 'neutral6' }}>
      <Flex mb={3} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Type.Body color="neutral4">
          <Trans>Margin</Trans>
        </Type.Body>
        <Flex sx={{ gap: '6px' }}>
          {QUICK_SET_AMOUNT_OPTIONS.map((option) => {
            return (
              <Box
                key={option.toString()}
                variant="tag"
                role="button"
                onClick={() => onChangeAmount(((balance * option) / 100).toString())}
                sx={{
                  fontSize: 13,
                  lineHeight: '20px',
                  color: 'neutral4',
                  '&:hover': { color: 'neutral2' },
                }}
              >
                {option}%
              </Box>
            )
          })}
        </Flex>
      </Flex>
      <Flex mb={2} sx={{ alignItems: 'center', gap: 3 }}>
        <NumberInput
          maxLength={11}
          value={amount}
          onValueChange={(e) => onChangeAmount(e.target.value)}
          sx={{ flex: 1 }}
        />
        <Type.H5 sx={{ color: 'neutral4', fontWeight: 'normal' }}>USDB</Type.H5>
      </Flex>
      <Type.Body color="neutral4">Balance: ${formatNumber(balance)}</Type.Body>
    </Box>
  )
}

const QUICK_SET_LEVERAGE_OPTIONS = [2, 5, 10, 20]
const DEFAULT_LEVERAGE = QUICK_SET_LEVERAGE_OPTIONS[0]
function LeverageInput({
  leverage,
  onChangeLeverage,
}: {
  leverage: number | string | undefined
  onChangeLeverage: (amount: string | undefined) => void
}) {
  return (
    <Flex mb={3} sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 3 }}>
      <Flex sx={{ alignItems: 'center', bg: 'background3', height: 40, px: 2 }}>
        <Type.Body sx={{ mr: '1ch' }}>
          <Trans>Leverage:</Trans>
        </Type.Body>
        <NumberInput
          value={leverage}
          onValueChange={(e) => onChangeLeverage(e.target.value || DEFAULT_LEVERAGE.toString())}
          maxLength={5}
          sx={{
            width: `${leverage ? leverage.toString().length : 1}ch`,
            input: { fontSize: '16px', fontWeight: 'normal', lineHeight: '24px', width: '100%', minWidth: '40px' },
          }}
        />
        <Type.Body mr={12}>x</Type.Body>
        <SettingIcon />
      </Flex>
      <Flex sx={{ flexShrink: 0, gap: 2 }}>
        {QUICK_SET_LEVERAGE_OPTIONS.map((option) => {
          return (
            <Box
              key={option.toString()}
              role="button"
              onClick={() => onChangeLeverage(option.toString())}
              sx={{
                fontSize: 16,
                lineHeight: '40px',
                textAlign: 'center',
                color: 'neutral4',
                '&:hover': { color: 'neutral2' },
                bg: 'background3',
                width: 40,
                height: 40,
                borderRadius: 0,
              }}
            >
              {option}x
            </Box>
          )
        })}
      </Flex>
    </Flex>
  )
}

function SettingIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 17.25C9.11 17.25 6.75 14.9 6.75 12C6.75 9.1 9.11 6.75 12 6.75C14.89 6.75 17.25 9.1 17.25 12C17.25 14.9 14.89 17.25 12 17.25ZM12 8.25C9.93 8.25 8.25 9.93 8.25 12C8.25 14.07 9.93 15.75 12 15.75C14.07 15.75 15.75 14.07 15.75 12C15.75 9.93 14.07 8.25 12 8.25Z"
        fill="#B7ED1C"
      />
      <path
        d="M7 12.75H2C1.59 12.75 1.25 12.41 1.25 12C1.25 11.59 1.59 11.25 2 11.25H7C7.41 11.25 7.75 11.59 7.75 12C7.75 12.41 7.41 12.75 7 12.75Z"
        fill="#B7ED1C"
      />
      <path
        d="M22 12.75H17C16.59 12.75 16.25 12.41 16.25 12C16.25 11.59 16.59 11.25 17 11.25H22C22.41 11.25 22.75 11.59 22.75 12C22.75 12.41 22.41 12.75 22 12.75Z"
        fill="#B7ED1C"
      />
    </svg>
  )
}

function Summary({ amount, leverage }: { amount: number | undefined; leverage: number | undefined }) {
  return (
    <Box mb={3}>
      <SummaryItem
        label={<Trans>Entry Price</Trans>}
        value={amount ? `$${formatNumber(amount)}` : '--'}
        sx={{ mb: 2 }}
      />
      <SummaryItem
        label={<Trans>Size</Trans>}
        value={amount && leverage ? `$${formatNumber(amount * leverage)}` : '--'}
      />
      <SummaryItem label={''} value={`~$${formatNumber(amount)}`} />
      <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Type.Caption color="neutral4">
          <Trans>Fee</Trans>
        </Type.Caption>
        <Type.Caption>{1123}</Type.Caption>
      </Flex>
    </Box>
  )
}
function SummaryItem({ label, value, sx }: { label: ReactNode; value: ReactNode; sx?: any }) {
  return (
    <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', ...(sx || {}) }}>
      <Type.Caption color="neutral4">{label}</Type.Caption>
      <Type.Caption>{value}</Type.Caption>
    </Flex>
  )
}

function Buttons({ amount, leverage }: { amount: number | undefined; leverage: number | undefined }) {
  return (
    <Flex mb={3} sx={{ gap: 3, '& > *': { flex: 1, height: 48 } }}>
      <Button variant="long">
        <Trans>Long</Trans>
      </Button>
      <Button variant="short">
        <Trans>Short</Trans>
      </Button>
    </Flex>
  )
}

function MarketStats() {
  return (
    <Box>
      <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Type.Caption color="neutral4">
          <Trans>Skew</Trans>
        </Type.Caption>
        <Type.Caption>
          <Box as="span" color="system2">
            {formatNumber(32.4)}%
          </Box>
          {' / '}
          <Box as="span" color="system1">
            {formatNumber(33.8)}%
          </Box>
        </Type.Caption>
      </Flex>
      <DifferentialBar sourceRate={52.23} targetRate={47.77} />
      <Box mb={3} />
      <MarketStatWrapper>
        <Type.Caption color="neutral4">
          <Trans>Max</Trans>
        </Type.Caption>
        <Type.Caption>${formatNumber(123123)}</Type.Caption>
        <Type.Caption textAlign="right">${formatNumber(123123)}</Type.Caption>
      </MarketStatWrapper>
      <MarketStatWrapper>
        <Type.Caption color="neutral4">
          <Trans>Est. Liq. Price</Trans>
        </Type.Caption>
        <Type.Caption>${formatNumber(123123)}</Type.Caption>
        <Type.Caption textAlign="right">${formatNumber(123123)}</Type.Caption>
      </MarketStatWrapper>
      <MarketStatWrapper>
        <Type.Caption color="neutral4">
          <Trans>Funding</Trans>
        </Type.Caption>
        <Type.Caption color="system2">${formatNumber(123123)}</Type.Caption>
        <Type.Caption textAlign="right" color="system1">
          ${formatNumber(123123)}
        </Type.Caption>
      </MarketStatWrapper>
    </Box>
  )
}

function MarketStatWrapper({ children }: { children: any }) {
  return (
    <Flex mb={2} sx={{ alignItems: 'center', gap: 2, '& > *': { flex: 1 } }}>
      {children}
    </Flex>
  )
}