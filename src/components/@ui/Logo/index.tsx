import logoWithText from 'assets/logo-with-text.svg'
import logo from 'assets/logo.svg'
import { Box, Image } from 'theme/base'

const Logo = ({ size = 32 }: { size?: number | number[] }) => {
  return (
    <Box height={size}>
      <Image src={logo} height="100%" />
    </Box>
  )
}
export const LogoWithText = ({ size = 26 }: { size?: number | number[] }) => {
  return (
    <Box height={size} display={['none', 'block']}>
      <Image src={logoWithText} />
    </Box>
  )
}

export default Logo
