import { Position } from 'entities/Position'

export function calcPnL(isLong: boolean, averagePrice: number, lastPrice: number, sizeUsd: number) {
  const priceDelta = averagePrice > lastPrice ? averagePrice - lastPrice : lastPrice - averagePrice
  const hasProfit = isLong ? lastPrice > averagePrice : averagePrice > lastPrice
  const delta = (sizeUsd * priceDelta) / averagePrice

  return delta === 0 ? 0 : hasProfit ? delta : -delta
}
export function calcOpeningPnL(position: Position, marketPrice?: number | undefined) {
  if (!marketPrice) return 0
  const entryPrice = position.sizeInUsd.num / position.sizeInToken.num
  return calcPnL(position.isLong, entryPrice, marketPrice, position.sizeInUsd.num)
}

export function calcOpeningROI(position: Position, realPnL: number) {
  return (realPnL / position.collateralInUsd.num) * 100
}

export function calcLiquidatePrice(position: Position) {
  const entryPrice = position.sizeInUsd.num / position.sizeInToken.num
  const totalFee = position.paidFees.num - position.paidFunding.num

  return (
    entryPrice +
    ((position.isLong ? 1 : -1) * (totalFee - 0.9 * position.collateralInUsd.num)) / position.sizeInToken.num
  )
}
