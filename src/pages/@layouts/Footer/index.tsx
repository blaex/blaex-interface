import { Trans } from '@lingui/macro'

import Logo from 'components/@ui/Logo'
import GithubIcon from 'theme/Icons/GithubIcon'
import TwitterIcon from 'theme/Icons/TwitterIcon'
import { Box, Flex, Type } from 'theme/base'
import { LINKS } from 'utils/config/constants'

const Footer = ({ height }: { height: number }) => {
  return (
    <Box
      as="footer"
      height={height}
      display="block"
      px={3}
      bg="background2"
      sx={{
        zIndex: 10,
        color: 'inherit',
      }}
    >
      <Flex
        sx={{
          alignItems: 'center',
          gap: 3,
          height: '100%',
          width: '100%',
        }}
      >
        <Logo size={24} />

        <Type.Caption color="neutral5">
          <Trans>© 2024 Blaex. All rights reserved.</Trans>
        </Type.Caption>
        <Flex flex="1" sx={{ alignItems: 'center', justifyContent: 'end', gap: [2, 3] }}>
          <Flex
            sx={{
              gap: [2, 3],
            }}
          >
            <Box as="a" href={LINKS.github} target="_blank" sx={{ lineHeight: 0, color: 'inherit' }}>
              <GithubIcon variant="Bold" size={20} />
            </Box>
            <Box as="a" href={LINKS.twitter} target="_blank" sx={{ lineHeight: 0, color: 'inherit' }}>
              <TwitterIcon variant="Bold" size={20} />
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Footer
