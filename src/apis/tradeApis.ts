import { OffchainOrder } from 'entities/Order'
import { OffchainPosition } from 'entities/Position'

import requester from './index'

export async function getOrders(account?: string): Promise<OffchainOrder[]> {
  return requester
    .get(`/orders`, {
      params: account ? { account } : undefined,
    })
    .then((res: any) => res.data?.data)
}

export async function getPositions(account?: string): Promise<OffchainPosition[]> {
  return requester
    .get(`/positions`, {
      params: account ? { account } : undefined,
    })
    .then((res: any) => res.data?.data)
}
