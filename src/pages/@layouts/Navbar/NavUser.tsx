import { Trans } from '@lingui/macro'
import { SignOut } from '@phosphor-icons/react'
import { ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'

import AddressAvatar from 'components/@ui/AddressAvatar'
import Divider from 'components/@ui/Divider'
import { useAuthContext } from 'hooks/web3/useAuth'
import { Button } from 'theme/Buttons'
import Dropdown, { DropdownItem } from 'theme/Dropdown'
import Modal from 'theme/Modal'
import { Box, Flex, Type } from 'theme/base'
import { NAVBAR_HEIGHT } from 'utils/config/constants'
import { addressShorten } from 'utils/helpers/format'

const NavUser = () => {
  const [isShowModalLogout, setIsShowModalLogout] = useState(false)
  const { logout, account } = useAuthContext()

  const [showMenu, setShowMenu] = useState(false)
  const onClickNavItem = (action?: string) => {
    setShowMenu(false)
  }

  return (
    <Flex alignItems="center" sx={{ height: NAVBAR_HEIGHT - 1 }}>
      <Flex flexDirection="column" alignItems="flex-start">
        <Dropdown
          menuSx={{
            width: 200,
          }}
          dismissible={false}
          menuDismissible
          visible={showMenu}
          setVisible={setShowMenu}
          menu={
            <>
              <DropdownItem
                onClick={() => {
                  sessionStorage.clear()
                  onClickNavItem()
                  setIsShowModalLogout(true)
                }}
              >
                <Flex alignItems="center" color="red2" sx={{ gap: 2 }}>
                  <SignOut size={20} />
                  <Box>
                    <Trans>Logout</Trans>
                  </Box>
                </Flex>
              </DropdownItem>
            </>
          }
          sx={{
            height: '100%',
            justifyContent: 'center',
            px: 3,
          }}
          buttonSx={{
            py: 0,
            pl: 0,
            pr: 1,
          }}
          placement="bottomRight"
        >
          <Flex sx={{ alignItems: 'center', gap: 2 }}>
            {!!account?.address && (
              <>
                <AddressAvatar address={account.address} size={32} />
                <Type.Caption>{addressShorten(account.address)}</Type.Caption>
              </>
            )}
          </Flex>
        </Dropdown>
      </Flex>

      {isShowModalLogout && (
        <Modal isOpen={isShowModalLogout} onDismiss={() => setIsShowModalLogout(false)}>
          <Box p={4}>
            <Flex justifyContent="center" flexDirection="column">
              <Box textAlign="center">
                <Type.BodyBold>
                  <Trans>Do you want to logout?</Trans>
                </Type.BodyBold>
              </Box>
            </Flex>

            <Flex mt={4} justifyContent="space-between">
              <Button variant="normal" px={4} width="49%" type="button" onClick={() => setIsShowModalLogout(false)}>
                <Trans>Back</Trans>
              </Button>
              <Button type="button" variant="primary" px={4} width="49%" onClick={logout}>
                <Trans>Confirm</Trans>
              </Button>
            </Flex>
          </Box>
        </Modal>
      )}
    </Flex>
  )
}

export default NavUser

type NavItemConfigs = {
  link: string
  onClick: () => void
  icon: JSX.Element
  label: JSX.Element
}

function NavItem(configs: NavItemConfigs) {
  return (
    <Link to={configs.link} style={{ display: 'block' }}>
      <DropdownItem onClick={configs.onClick}>
        <Flex alignItems="center" sx={{ gap: 2 }}>
          {configs.icon}
          <Box color="neutral1">{configs.label}</Box>
        </Flex>
      </DropdownItem>
    </Link>
  )
}

function SectionDivider({ label }: { label: ReactNode }) {
  return (
    <Flex sx={{ px: 2, mb: 2, width: '100%', alignItems: 'center', gap: 2 }}>
      <Type.Caption color="neutral3" sx={{ flexShrink: 0 }}>
        {label}
      </Type.Caption>
      <Box sx={{ flex: 1 }}>
        <Divider />
      </Box>
    </Flex>
  )
}
