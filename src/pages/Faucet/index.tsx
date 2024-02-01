import useRequiredChain from 'hooks/web3/useRequiredChain'
import { Box, Flex, Type } from 'theme/base'
import { SEPOLIA } from 'utils/web3/chains'

import BlastBalance from './BlastBalance'
import BridgeAction from './BridgeAction'
import MintAction from './MintAction'

const FaucetPage = () => {
  const { isValid, alert } = useRequiredChain({ chainId: SEPOLIA })
  return (
    <Box mx="auto" width="500px" mt={80}>
      <Type.H3>Faucet</Type.H3>
      {isValid ? (
        <>
          <Box variant="card" p={3} mt={3}>
            <Flex sx={{ gap: 3 }}>
              <Box>Step 1</Box>
              <Box>Mint 10,000 USD on Sepolia</Box>
            </Flex>
            <MintAction />
          </Box>
          <Box variant="card" p={3} mt={3}>
            <Flex sx={{ gap: 3 }}>
              <Box>Step 2</Box>
              <Box>Bridge 10,000 USDB to Blast L2</Box>
            </Flex>
            <BridgeAction />
          </Box>
          <Box variant="card" p={3} mt={3}>
            <Flex sx={{ gap: 3 }}>
              <Box>Step 3</Box>
              <Box>Waiting for bridge to finish (~5 min)</Box>
            </Flex>
            <BlastBalance />
          </Box>
        </>
      ) : (
        alert
      )}
    </Box>
  )
}

export default FaucetPage
