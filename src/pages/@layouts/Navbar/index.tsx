import { Trans } from '@lingui/macro'
import { ReactElement, useState } from 'react'
import { Link } from 'react-router-dom'

import { LogoWithText } from 'components/@ui/Logo'
import LoginAction from 'components/LoginAction'
import { useAuthContext } from 'hooks/web3/useAuth'
import NavbarUser from 'pages/@layouts/Navbar/NavUser'
import { Button } from 'theme/Buttons'
import Loading from 'theme/Loading'
import { Box, Flex, Type } from 'theme/base'

import HamburgerMenu from './HamburgetMenu'
import Menu from './Menu'
import { DesktopNavLinks } from './NavLinks'
import { LogoWrapper, Main, Wrapper } from './styled'

export default function Navbar({ height }: { height: number }): ReactElement {
  const { isAuthenticated, disconnect } = useAuthContext()

  const [activeMobileMenu, setActiveMobileMenu] = useState(false)

  return (
    <Box as="header" sx={{ zIndex: [101, 101, 101, 11] }}>
      <Wrapper height={height}>
        <Menu visible={activeMobileMenu} onClose={() => setActiveMobileMenu(false)} />
        <Main>
          <Flex sx={{ alignItems: 'center', gap: 48 }}>
            <Link to={'/'}>
              <LogoWrapper>
                <LogoWithText />
              </LogoWrapper>
            </Link>
            <Box
              display={{ _: 'none', xl: 'flex' }}
              sx={{ alignItems: 'center', textAlign: 'center', gap: 4, height: '100%' }}
            >
              <DesktopNavLinks />
            </Box>
          </Flex>

          <Flex alignItems="center" height="100%">
            <Box flex="0 0 fit-content" sx={{ alignItems: 'center' }}>
              {isAuthenticated === true && <NavbarUser />}
              {isAuthenticated === false && <LoginAction />}
              {isAuthenticated == null && (
                <Flex py={12} px={16} alignItems="center" sx={{ gap: 3 }}>
                  <Loading size={16} />
                  <Box>
                    <Type.CaptionBold display="block" lineHeight="13px">
                      <Trans>Connecting Wallet...</Trans>
                    </Type.CaptionBold>
                    <Button variant="ghost" px={0} py={0} my={0}>
                      <Type.Caption lineHeight="13px" onClick={() => disconnect()}>
                        <Trans>Cancel</Trans>
                      </Type.Caption>
                    </Button>
                  </Box>
                </Flex>
              )}
            </Box>
            <Box
              display={{ _: 'block', xl: 'none' }}
              sx={{ p: 3, height: '100%', display: 'none', borderLeft: 'small', borderLeftColor: 'neutral4' }}
            >
              <HamburgerMenu active={activeMobileMenu} onClick={() => setActiveMobileMenu((prev) => !prev)} />
            </Box>
          </Flex>
        </Main>
      </Wrapper>
    </Box>
  )
}
