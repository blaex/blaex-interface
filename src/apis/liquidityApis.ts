import requester from './index'

export async function getLiquidityApr(): Promise<number> {
  return requester.get('/daily-statistics/apr').then((res: any) => res.data)
}
