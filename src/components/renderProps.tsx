import { SignedText } from 'components/@ui/DecoratedText/SignedText'
import { Position } from 'entities/Position'
import useUsdPrices, { UsdPrices } from 'hooks/store/useUsdPrices'
import { Box, TextProps, Type } from 'theme/base'
import { calcLiquidatePrice, calcOpeningPnL } from 'utils/helpers/calculate'
import { formatNumber } from 'utils/helpers/format'

type MarketPriceComponentProps = {
  market: string
  fontInherit?: boolean
  textProps?: TextProps
}
export function MarketPrice(props: Omit<MarketPriceComponentProps, 'prices'>) {
  const { prices } = useUsdPrices()
  if (!prices) return <>--</>
  const marketPrice = `$${formatNumber(prices[props.market], 2, 2)}`
  return props.fontInherit ? (
    <Box as="span" {...props.textProps}>
      {marketPrice}
    </Box>
  ) : (
    <Type.Caption {...props.textProps}>{marketPrice}</Type.Caption>
  )
}

type LiquidatePriceComponentProps = {
  data?: Position
  fontInherit?: boolean
  textProps?: TextProps
}
export function LiquidatePrice(props: Omit<LiquidatePriceComponentProps, 'prices'>) {
  const { prices } = useUsdPrices()
  if (!props.data || !prices) return <>--</>
  const liquidatePrice = calcLiquidatePrice(props.data)
  const liquidatePriceText = `$${formatNumber(liquidatePrice, 2, 2)}`
  return props.fontInherit ? (
    <Box as="span" {...props.textProps}>
      {liquidatePriceText}
    </Box>
  ) : (
    <Type.Caption {...props.textProps}>{liquidatePriceText}</Type.Caption>
  )
}

type OpeningPnLComponentProps = {
  data: Position | undefined
  prices: UsdPrices | undefined
  ignoreFee?: boolean
  sx?: any
}
export function OpeningPnL(props: Omit<OpeningPnLComponentProps, 'prices'>) {
  const { prices } = useUsdPrices()
  if (!prices) return <>--</>
  return <OpeningPnLComponent {...props} prices={prices} />
}
function OpeningPnLComponent({ data, prices, ignoreFee, sx }: OpeningPnLComponentProps) {
  if (!data || !prices) return <>--</>
  const marketPrice = prices['ETHUSD']
  const openingPnl = calcOpeningPnL(data, marketPrice)
  const pnl = ignoreFee ? openingPnl : openingPnl - data.paidFees.num + data.paidFunding.num
  return (
    <Type.Small>
      {SignedText({
        value: pnl,
        maxDigit: 2,
        minDigit: 2,
        showPlus: true,
        fontInherit: true,
        prefix: '$',
        sx: { textAlign: 'right', width: '100%', ...sx },
      })}
    </Type.Small>
  )
}
