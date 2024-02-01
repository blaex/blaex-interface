import { isMobile } from 'hooks/helpers/useIsMobile'

export const SUPPORTED_LOCALES = ['en']
export const DEFAULT_LOCALE = 'en'

export const NETWORK = import.meta.env.VITE_NETWORK_ENV
export const APP_URL = import.meta.env.VITE_URL

export const LINKS = {
  website: 'https://blaex.io',
  webapp: 'https://app.blaex.io',
  baseTelegram: 'https://t.me',
  docs: 'https://docs.blaex.io/',
}

export const NAVBAR_HEIGHT = 60
export const FOOTER_HEIGHT = 40

export const FONT_FAMILY =
  'SFRounded, ui-rounded, "SF Pro Rounded", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
export const DATE_FORMAT = 'YYYY/MM/DD'
export const DAYJS_FULL_DATE_FORMAT = 'YYYY/MM/DD - HH:mm'
export const DEFAULT_LIMIT = 20
export const DEFAULT_LIMIT_VALUES = [20, 50, 100]
export const SEARCH_DEFAULT_LIMIT = 3

export const MIN_PARSE_ETHER = 0.00000001
export const MIN_AMOUNT = 0.01
export const SEARCH_DEBOUNCE_TIME = 200 //ms

export const COUNTDOWN_TIME = 60 // s
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,64}$/
export const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

export const EVM_TX_HASH_REGEX = /^0x?([a-fA-F0-9]{64})$/

export const CHART_DAYS_DURATION = 30
export const CHART_DATE_FORMAT = 'DD.MM'
export const CHART_MIN_HEIGHT = 320
export const YAXIS_WIDTH = isMobile ? 50 : 85
export const MIN_TICK_GAP = 30

export const DELAY_SYNC = 3 * 1000 //milliseconds

export const RELOAD_TOP_OPENING_POSITIONS = 5 * 60 * 1000 //milliseconds

export const MAX_IMAGE_SIZE = 10 * 1024 * 1024 //mb

export const DEFAULT_COVER_IMAGE_URL = '/images/cover.png'
