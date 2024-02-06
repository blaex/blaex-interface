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
