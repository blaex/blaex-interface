export interface OffchainOrder {
  id: string
  account: string
  txHash: string
  logId: number
  blockNumber: number
  blockTime: string
  orderId: number
  orderType: string
  isLong: boolean
  market: number
  collateralToken: string
  collateralDeltaUsd: number
  sizeDeltaUsd: number
  triggerPrice: number
  acceptablePrice: number
  executionPrice: number
  protocolFees: number
  keeperFees: number
  status: string
  createdAt: string
}
