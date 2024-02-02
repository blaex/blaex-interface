import dayjs from 'dayjs'

import { SUPPORTED_LOCALES } from 'utils/config/constants'
import { ApiListResponse, ApiResponseMeta } from 'apis/types'

// dayjs.extend(duration)

/**
 * Given a locale string (e.g. from user agent), return the best match for corresponding SupportedLocale
 * @param maybeSupportedLocale the fuzzy locale identifier
 */
export function parseLocale(maybeSupportedLocale: string) {
  if (typeof maybeSupportedLocale !== 'string') return undefined
  const lowerMaybeSupportedLocale = maybeSupportedLocale.toLowerCase()
  return SUPPORTED_LOCALES.find(
    (locale) => locale.toLowerCase() === lowerMaybeSupportedLocale || locale.split('-')[0] === lowerMaybeSupportedLocale
  )
}

export function parseSocialLink(link: string | undefined) {
  if (!link || link.length === 0) return ''

  if (link.startsWith('http://') || link.startsWith('https://')) {
    return link
  }

  return `https://${link}`
}

export function floorNumber(num: number, decimals: number) {
  const multipler = Number('1'.padEnd(1 + decimals, '0'))
  return Math.floor(num * multipler) / multipler
}

export function generateObjectPrefix(arr: string[], prefix: string) {
  const obj: { [key: string]: string } = {}
  return arr.reduce((prev, cur) => {
    prev[cur] = `${prefix}.${cur}`
    return prev
  }, obj)
}

export function generateObjectByKeys<T>(arr: (keyof T)[]): { [key in keyof T]: keyof T } {
  const obj = {} as { [key in keyof T]: keyof T }
  return arr.reduce((prev, cur) => {
    prev[cur] = cur
    return prev
  }, obj)
}

/**
 * https://day.js.org/docs/en/manipulate/utc-offset
 * @param {Date} date
 */
export function toCurrentOffset(date: Date) {
  let result = dayjs(date)
  result = result.subtract(dayjs().utcOffset(), 'minutes')

  return result.toDate()
}

/**
 * https://day.js.org/docs/en/manipulate/utc-offset
 * @param {Date} date
 */
export function toDateOffset(date: Date) {
  let result = dayjs(date)
  result = result.add(result.utcOffset(), 'minutes')

  return result.toDate()
}

export const pageToOffset = (page: number, limit: number) => (page - 1) * limit
export const offsetToPage = (offset: number, limit: number) => offset / limit + 1

export function getNextParam(limit: number, meta?: ApiResponseMeta) {
  const _nextOffset = (meta?.offset ?? 0) + limit
  const _total = meta?.total ?? 0
  if (_nextOffset >= _total) {
    return undefined
  }
  return (meta?.offset ?? 0) + limit
}

export function getPaginationDataFromList<T>({
  currentPage,
  limit,
  data,
}: {
  currentPage: number
  limit: number
  data: T[] | undefined
}): ApiListResponse<T> {
  if (!data) {
    return {
      data: [],
      meta: {
        limit,
        offset: 0,
        total: 0,
        totalPages: 0,
      },
    }
  }
  const currentOffset = pageToOffset(currentPage, limit)
  const total = data.length
  const slicedData = data.slice(currentOffset, currentOffset + limit > total ? undefined : currentOffset + limit)
  return { data: slicedData, meta: { limit, offset: currentOffset, total, totalPages: Math.ceil(total / limit) } }
}

export function parseMarketImageSrc(symbol: string) {
  return `/svg/markets/${symbol}.svg`
}
