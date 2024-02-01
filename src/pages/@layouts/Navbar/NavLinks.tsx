import { Trans } from '@lingui/macro'
import { ReactNode } from 'react'
import { NavLink as Link, NavLinkProps } from 'react-router-dom'
import styled from 'styled-components/macro'

import { Box } from 'theme/base'
import ROUTES from 'utils/config/routes'

export function DesktopNavLinks() {
  return (
    <DesktopWrapper>
      <NavLinks />
    </DesktopWrapper>
  )
}
export function MobileNavLinks({ onClose }: { onClose?: () => void }) {
  return (
    <MobileWrapper>
      <NavLinks onClose={onClose} />
    </MobileWrapper>
  )
}

function NavLinks({ onClose }: { onClose?: () => void }) {
  return (
    <>
      {configs.map((config, index) => {
        return (
          <NavLink key={index} to={config.route} onClick={onClose} matchpath={config?.matchpath}>
            {config.label}
          </NavLink>
        )
      })}
    </>
  )
}

const configs: { route: string; label: ReactNode; matchpath: string }[] = [
  {
    route: ROUTES.PERPETUAL.path,
    label: <Trans>Perpetual</Trans>,
    matchpath: ROUTES.PERPETUAL.path,
  },
  {
    route: ROUTES.SWAP.path,
    label: <Trans>Swap</Trans>,
    matchpath: ROUTES.SWAP.path,
  },
  {
    route: ROUTES.LIQUIDITY.path,
    label: <Trans>Liquidity</Trans>,
    matchpath: ROUTES.LIQUIDITY.path,
  },
  {
    route: ROUTES.FAUCET.path,
    label: <Trans>Faucet</Trans>,
    matchpath: ROUTES.FAUCET.path,
  },
  // {
  //   route: ROUTES.REFERRALS.path,
  //   label: <Trans>Referrals</Trans>,
  //   matchpath: ROUTES.REFERRALS.path,
  // },
  // {
  //   route: ROUTES.DOCS.path,
  //   label: <Trans>Docs</Trans>,
  //   matchpath: ROUTES.DOCS.path,
  // },
]

function NavLink(props: NavLinkProps & { matchpath: string }) {
  return (
    <Link
      className="navlink-default"
      activeClassName="navlink-active"
      isActive={(match, location) => {
        if (props.matchpath === ROUTES.PERPETUAL.path && location.pathname === props.matchpath) {
          return true
        }
        if (!match) {
          return false
        }

        if (
          (props.matchpath !== ROUTES.PERPETUAL.path &&
            !!props.matchpath &&
            !!location.pathname.match(props?.matchpath)) ||
          location.pathname === (props.to as Location).pathname
        )
          return true
        return false
      }}
      {...props}
    >
      <Box as="span">{props.children}</Box>
    </Link>
  )
}

const DesktopWrapper = styled(Box)`
  display: flex;
  align-items: center;
  gap: 32px;
  position: relative;
  height: 100%;
  .navlink-default {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 13px;
    // padding: 0 8px;
    color: ${({ theme }) => theme.colors.neutral5};
    // border-bottom: 1px solid transparent;
    // background-position: bottom;
    transition: 0.3s;
  }
  .navlink-active {
    color: ${({ theme }) => theme.colors.neutral1};
    // background: linear-gradient(0deg, #303963 0.16%, rgba(11, 13, 23, 0) 102.34%);
    // background-size: 100% 16px;
    // background-position: bottom;
    // background-repeat: no-repeat;
    // background-position: bottom;
    // border-bottom: 1px solid ${({ theme }) => theme.colors.primary1};
  }
  .navlink-default:hover {
    color: ${({ theme }) => theme.colors.neutral3};
  }
`

const MobileWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  .navlink-default {
    display: block;
    font-weight: 600;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.neutral1};
  }
  .navlink-active {
    color: ${({ theme }) => theme.colors.primary1};
  }
`
