import { useResponsive } from 'ahooks'

import CustomPageTitle from 'components/@ui/CustomPageTitle'
import { Box, Flex } from 'theme/base'

export default function Home() {
  const { md } = useResponsive()
  return (
    <>
      <CustomPageTitle title="Blaex" />
      <Box>Home</Box>
    </>
  )
}
