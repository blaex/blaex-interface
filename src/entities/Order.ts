import { BigNumber } from '@ethersproject/bignumber'

import Num from './Num'

export interface Order {
  id: number
  account: string
  market: number
  isLong: boolean
  isIncrease: boolean
  sizeDeltaUsd: Num
  collateralDeltaUsd: Num
  triggerPrice: Num
  acceptablePrice: Num
  executionPrice: Num
  orderFees: Num
  executionFees: Num
  submissionTime: Date
  isExecuted: boolean
  isCanceled: boolean
}
export interface OnChainOrder {
  id: BigNumber
  account: string
  market: BigNumber
  isLong: boolean
  isIncrease: boolean
  sizeDeltaUsd: BigNumber
  collateralDeltaUsd: BigNumber
  triggerPrice: BigNumber
  acceptablePrice: BigNumber
  executionPrice: BigNumber
  orderFees: BigNumber
  executionFees: BigNumber
  submissionTime: BigNumber
  isExecuted: BigNumber
  isCanceled: BigNumber
}

export interface OffchainOrder {
  id: string
  account: string
  txHash: string
  logId: number
  blockNumber: number
  blockTime: string
  orderId: number
  isLong: boolean
  isIncrease: boolean
  market: number
  collateralDeltaUsd: number
  sizeDeltaUsd: number
  triggerPrice: number
  acceptablePrice: number
  executionPrice: number
  orderFees: number
  executionFees: number
  status: string
  canceledReason: string
  createdAt: string
}
