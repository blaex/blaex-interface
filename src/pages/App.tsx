import { Suspense, lazy } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Route, Switch } from 'react-router-dom'

import NotFound from 'components/@ui/NotFound'
import Loading from 'theme/Loading'
import { Box } from 'theme/base'
import ROUTES from 'utils/config/routes'

import ErrorFallback from './@helpers/ErrorFallback'
import QSReader from './@helpers/QSReader'
import ScrollToTop from './@helpers/ScrollToTop'
import AppWrapper from './AppWrapper'

const HomePage = lazy(() => import('./Home'))
const LiquidityPage = lazy(() => import('./Liquidity'))
const FaucetPage = lazy(() => import('./Faucet'))

function App() {
  // useEffect(() => {
  //   ReactGA.initialize('G-SJ25F1YFSM', { gtagUrl: 'https://www.googletagmanager.com/gtag/js?id=G-SJ25F1YFSM' })
  // }, [])

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AppWrapper>
        <Suspense
          fallback={
            <Box p={4}>
              <Loading />
            </Box>
          }
        >
          <ScrollToTop />
          <QSReader />
          <Switch>
            <Route path={ROUTES.LIQUIDITY.path} component={LiquidityPage}></Route>
            <Route path={ROUTES.FAUCET.path} component={FaucetPage}></Route>
            <Route path={ROUTES.HOME.path} exact component={HomePage}></Route>
            <Route path="*" component={NotFound}></Route>
          </Switch>
        </Suspense>
      </AppWrapper>
    </ErrorBoundary>
  )
}

export default App
