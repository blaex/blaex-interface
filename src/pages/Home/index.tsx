import Container from 'components/@ui/Container'
import CustomPageTitle from 'components/@ui/CustomPageTitle'

import Chart from './Chart'

export default function HomePage() {
  return (
    <>
      <CustomPageTitle title="Blaex" />
      <Container p={3}>
        <Chart />
      </Container>
    </>
  )
}
