import { STORAGE_KEYS } from 'utils/config/keys'

import requester from './index'

export const storeAuth = ({ wallet, account }: { wallet?: string; account: string }) => {
  if (wallet) localStorage.setItem(STORAGE_KEYS.WALLET, wallet)
  localStorage.setItem(STORAGE_KEYS.ACCOUNT, account)
}
export const clearAuth = () => {
  requester.defaults.headers.common['Authorization'] = ''
  localStorage.removeItem(STORAGE_KEYS.WALLET)
  localStorage.removeItem(STORAGE_KEYS.ACCOUNT)
}

export const getStoredWallet = (): { account: string | null; wallet: string | null } => {
  const wallet = localStorage.getItem(STORAGE_KEYS.WALLET)
  const account = localStorage.getItem(STORAGE_KEYS.ACCOUNT)
  return { wallet, account }
}

const URL_PUBLIC = '/public/'
const URL_PRIVATE = '/'

export const apiWrapper = (url: string): string => {
  if (requester?.defaults?.headers && requester.defaults.headers.common['Authorization']) {
    return URL_PRIVATE + url
  }
  return URL_PUBLIC + url
}
