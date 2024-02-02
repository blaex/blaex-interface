import { ReactNode } from 'react'

import useRequiredChain from 'hooks/web3/useRequiredChain'
import { Box, Flex, Type } from 'theme/base'
import { generateClipPath } from 'utils/helpers/css'
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
        <Box sx={{ fontWeight: 600 }}>
          <Box variant="cardPolygon" mt={3} sx={{ p: 0, bg: 'neutral7' }}>
            <Flex sx={{ alignItems: 'center', gap: 3 }}>
              <StepBox>Step 1</StepBox>
              <Box>
                Mint{' '}
                <Box as="span" color="primary1">
                  10,000
                </Box>{' '}
                USD on Sepolia
              </Box>
            </Flex>
            <Box sx={{ px: 3, py: 24 }}>
              <MintAction />
            </Box>
          </Box>
          <GapSymbol />
          <Box variant="cardPolygon" mt={3} sx={{ p: 0, bg: 'neutral7' }}>
            <Flex sx={{ alignItems: 'center', gap: 3 }}>
              <StepBox>Step 2</StepBox>
              <Box>
                Bridge{' '}
                <Box as="span" color="primary1">
                  10,000
                </Box>{' '}
                USDB to Blast L2
              </Box>
            </Flex>
            <Box sx={{ px: 3, py: 24 }}>
              <BridgeAction />
            </Box>
          </Box>
          <GapSymbol />
          <Box variant="cardPolygon" mt={3} sx={{ p: 0, bg: 'neutral7' }}>
            <Flex sx={{ alignItems: 'center', gap: 3 }}>
              <StepBox>Step 3</StepBox>
              <Box>Waiting for bridge to finish (~5 min)</Box>
            </Flex>
            <Box sx={{ px: 3, py: 24 }}>
              <BlastBalance />
            </Box>
          </Box>
        </Box>
      ) : (
        alert
      )}
    </Box>
  )
}

function StepBox({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        width: 180,
        pr: 4,
        flexShrink: 0,
        height: 48,
        lineHeight: '48px',
        textAlign: 'center',
        bg: 'neutral6',
        clipPath: generateClipPath({ type: '1br', diffX: 48, diffY: 48 }),
      }}
    >
      {children}
    </Box>
  )
}
function GapSymbol() {
  return (
    <Flex my={4} sx={{ width: '100%', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
      <Box sx={{ height: 24, width: '1px', bg: 'neutral6' }} />
      <Box sx={{ height: 24, width: '1px', bg: 'neutral6' }} />
      <Box sx={{ height: 24, width: '1px', bg: 'neutral6' }} />
    </Flex>
  )
}

export default FaucetPage
