import { BigNumber } from '@ethersproject/bignumber'

import Num from './Num'

export interface Position {
  account: string
  collateralInUsd: Num
  collateralToken: string
  id: number
  isClose: boolean
  isLong: boolean
  latestInteractionFunding: Num
  market: number
  paidFees: Num
  paidFunding: Num
  realisedPnl: Num
  sizeInToken: Num
  sizeInUsd: Num
}

export interface OnchainPosition {
  account: string
  collateralInUsd: BigNumber
  collateralToken: string
  id: BigNumber
  isClose: boolean
  isLong: boolean
  latestInteractionFunding: BigNumber
  market: BigNumber
  paidFees: BigNumber
  paidFunding: BigNumber
  realisedPnl: BigNumber
  sizeInToken: BigNumber
  sizeInUsd: BigNumber
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
  collateralToken: string
  sizeInUsd: number
  sizeInToken: number
  collateralInUsd: number
  lastSizeInUsd: number
  lastSizeInToken: number
  lastCollateralInUsd: number
  realisedPnl: number
  paidFunding: number
  latestInteractionFunding: number
  paidFees: number
  isLong: boolean
  isClose: boolean
  createdAt: string
}
