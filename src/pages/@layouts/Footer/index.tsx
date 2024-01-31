import { Trans } from '@lingui/macro'

// import DiscordIcon from 'theme/Icons/DiscordIcon'
// import GithubIcon from 'theme/Icons/GithubIcon'
// import TelegramIcon from 'theme/Icons/TelegramIcon'
// import TwitterIcon from 'theme/Icons/TwitterIcon'
import { Box, Flex, Type } from 'theme/base'
import { LINKS } from 'utils/config/constants'
// import ROUTES from 'utils/config/routes'

const Footer = ({ height }: { height: number }) => {
  return (
    <Box
      as="footer"
      height={height}
      display="block"
      px={3}
      sx={{
        borderTop: 'small',
        borderColor: 'neutral4',
        '& a': {
          color: 'inherit',
          '&:hover': {
            color: 'neutral1',
          },
        },
        zIndex: 10,
      }}
    >
      <Flex
        sx={{
          alignItems: 'center',
          gap: 3,
          height: '100%',
          width: ['fit-content', 'fit-content', '100%'],
        }}
      >
        <Type.Caption color="neutral8" display={['none', 'none', 'block']}>
          <Trans>© 2024 Blaex. All rights reserved.</Trans>
        </Type.Caption>
        <Flex flex="1" sx={{ alignItems: 'center', justifyContent: 'end', gap: [2, 3] }}>
          <Flex
            sx={{
              gap: [2, 3],
            }}
            color="neutral8"
          >
            <a
              href={LINKS.website}
              target="_blank"
              rel="noreferrer"
              style={{
                lineHeight: '16px',
                fontSize: '13px',
              }}
            >
              <Trans>Home</Trans>
            </a>
            <a
              href={LINKS.docs}
              target="_blank"
              rel="noreferrer"
              style={{
                lineHeight: '16px',
                fontSize: '13px',
              }}
            >
              <Trans>Docs</Trans>
            </a>
          </Flex>
          {/* <Box sx={{ width: '1px', height: '24px', bg: 'neutral4' }} />
          <Flex color="neutral8" sx={{ alignItems: ['flex-start', 'center'], gap: [2, 3] }}>
            <Box as="a" href={LINKS.discord} target="_blank" sx={{ lineHeight: 0 }}>
              <DiscordIcon variant="Bold" size={20} />
            </Box>
            <Box as="a" href={LINKS.telegram} target="_blank" sx={{ lineHeight: 0 }}>
              <TelegramIcon variant="Bold" size={20} />
            </Box>
            <Box as="a" href={LINKS.twitter} target="_blank" sx={{ lineHeight: 0 }}>
              <TwitterIcon size={20} />
            </Box>
            <Box as="a" href={LINKS.github} target="_blank" sx={{ lineHeight: 0 }}>
              <GithubIcon variant="Bold" size={20} />
            </Box>
          </Flex> */}
        </Flex>
      </Flex>
      {/* Links */}
    </Box>
  )
}

export default Footer
