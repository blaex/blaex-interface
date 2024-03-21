import { BigNumber } from '@ethersproject/bignumber'

import Num from './Num'

export interface Position {
  id: number
  account: string
  market: number
  isLong: boolean
  sizeInToken: Num
  sizeInUsd: Num
  collateralInUsd: Num
  paidFees: Num
  realisedPnl: Num
  paidFunding: Num
  latestInteractionFunding: Num
  isClose: boolean
  isLiquidated: boolean
}

export interface OnchainPosition {
  id: BigNumber
  account: string
  market: BigNumber
  isLong: boolean
  sizeInUsd: BigNumber
  sizeInToken: BigNumber
  collateralInUsd: BigNumber
  sl: BigNumber
  tp: BigNumber
  paidFees: BigNumber
  realisedPnl: BigNumber
  paidFunding: BigNumber
  latestInteractionFunding: BigNumber
  isClose: boolean
  isLiquidated: boolean
}

export interface OffchainPosition {
  id: string
  txHash: string
  logId: number
  blockNumber: number
  blockTime: string
  positionId: number
  account: string
  market: number
  isLong: boolean
  sizeInUsd: number
  sizeInToken: number
  collateralInUsd: number
  lastSizeInUsd: number
  lastSizeInToken: number
  lastCollateralInUsd: number
  paidFees: number
  realisedPnl: number
  paidFunding: number
  latestInteractionFunding: number
  isClose: boolean
  isLiquidated: boolean
  createdAt: string
}
