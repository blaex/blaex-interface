import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

import { InitBalancesStore } from 'hooks/store/useBalancesManagement'
import useGlobalDialog from 'hooks/store/useGlobalDialog'
import useChainRestrict from 'hooks/web3/useChainRestrict'
import useEagerConnect from 'hooks/web3/useEagerConnect'
import Navbar from 'pages/@layouts/Navbar'
import Loading from 'theme/Loading'
import { Box, Flex, Type } from 'theme/base'
import { NAVBAR_HEIGHT } from 'utils/config/constants'
import { ELEMENT_IDS } from 'utils/config/keys'

import Footer from './@layouts/Footer'

const AppWrapper = ({ children }: { children: ReactNode }) => {
  useChainRestrict()
  useEagerConnect()
  const dialog = useGlobalDialog((state) => state.dialog)

  return (
    <>
      <InitBalancesStore />
      <Flex className="app_wrapper" sx={{ height: '100%', flexDirection: 'column' }}>
        <Navbar height={NAVBAR_HEIGHT} />
        <Box id={ELEMENT_IDS.APP_MAIN_WRAPPER} width="100%" flex="1" sx={{ position: 'relative', overflowY: 'auto' }}>
          {children}
          <ToastContainer theme="dark" limit={3} autoClose={5000} />
        </Box>
        <Footer height={40} />
      </Flex>
      {dialog && (
        <Flex
          justifyContent="center"
          alignItems="center"
          variant="shadow"
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 10000,
          }}
        >
          <Box variant="card" width="fit-content" height="fit-content" textAlign="center">
            {dialog.hasLoading && <Loading />}
            <Type.BodyBold display="block">{dialog.title}</Type.BodyBold>
            {!!dialog.description && <Type.Caption color="neutral3">{dialog.description}</Type.Caption>}
            <Box>{dialog.body}</Box>
          </Box>
        </Flex>
      )}
    </>
  )
}

export default AppWrapper
