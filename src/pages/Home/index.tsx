import { useResponsive } from 'ahooks'

import CustomPageTitle from 'components/@ui/CustomPageTitle'
import { Box } from 'theme/base'

import PlaceOrderForm from './PlaceOrderForm'

export default function HomePage() {
  const { md } = useResponsive()
  return (
    <>
      <CustomPageTitle title="Blaex" />
      <Box>Home</Box>
      <PlaceOrderForm />
    </>
  )
}
