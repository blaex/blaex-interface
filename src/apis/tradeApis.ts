import { OffchainOrder } from 'entities/Order'
import { OffchainPosition } from 'entities/Position'

import requester from './index'

export async function getOrders(account?: string): Promise<OffchainOrder[]> {
  return requester
    .get(`/orders`, {
      params: { sortBy: 'blockTime', sortType: 'desc', account },
    })
    .then((res: any) => res.data?.data)
}

export async function getPositions(account?: string): Promise<OffchainPosition[]> {
  return requester
    .get(`/positions`, {
      params: { sortBy: 'blockTime', sortType: 'desc', account, isClose: true },
    })
    .then((res: any) => res.data?.data)
}
