import { useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { parsedQueryString } from 'hooks/router/useParsedQueryString'
import { useDarkModeStore } from 'hooks/store/useDarkMode'
import { useUserLocaleStore } from 'hooks/store/useLocale'
import { parseLocale } from 'utils/helpers/transform'

export default function QSReader() {
  const { setUserDarkMode } = useDarkModeStore()
  const { setUserLocale } = useUserLocaleStore()
  const { search } = useLocation()

  const setDarkModeFromQuery = useCallback(
    (theme: any) => {
      if (typeof theme !== 'string') return
      if (theme.toLowerCase() === 'light') {
        setUserDarkMode(false)
      } else if (theme.toLowerCase() === 'dark') {
        setUserDarkMode(true)
      }
    },
    [setUserDarkMode]
  )

  const setLocaleFromQuery = useCallback(
    (locale: any) => {
      if (typeof locale !== 'string') return
      const parsedLocale = parseLocale(locale)
      if (parsedLocale) {
        setUserLocale(parsedLocale)
      }
    },
    [setUserLocale]
  )

  useEffect(() => {
    const parsed = parsedQueryString(search)
    setDarkModeFromQuery(parsed.theme)
    setLocaleFromQuery(parsed.lang)
  }, [search, setDarkModeFromQuery, setLocaleFromQuery])

  return null
}
