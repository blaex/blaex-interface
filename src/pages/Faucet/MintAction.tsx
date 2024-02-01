import { parseEther } from '@ethersproject/units'
import { Trans } from '@lingui/macro'
import { useState } from 'react'

import TransactionLink from 'components/@ui/TransactionLink'
import { useAuthContext } from 'hooks/web3/useAuth'
import { useContract } from 'hooks/web3/useContract'
import useContractMutation from 'hooks/web3/useContractMutation'
import { Button } from 'theme/Buttons'
import { Box, Flex, Type } from 'theme/base'
import { CONTRACT_KEYS } from 'utils/config/keys'
import { SEPOLIA } from 'utils/web3/chains'
import { CONTRACT_ABIS, CONTRACT_ADDRESSES } from 'utils/web3/contracts'

const MintAction = () => {
  const { account } = useAuthContext()
  const [tx, setTx] = useState<string>()
  const USDBContract = useContract({
    contract: {
      address: CONTRACT_ADDRESSES[SEPOLIA][CONTRACT_KEYS.USDB],
      abi: CONTRACT_ABIS[CONTRACT_KEYS.USDB],
    },
    withSignerIfPossible: true,
  })
  const { isLoading, mutate } = useContractMutation(USDBContract)
  const handleMint = async () => {
    if (!account) return
    mutate(
      {
        method: 'mint',
        params: [account.address, parseEther('10000')],
      },
      {
        onSuccess: (data) => {
          setTx(data.transactionHash)
        },
      }
    )
  }
  return (
    <Box mt={3}>
      {!tx ? (
        <Button variant="primary" block disabled={isLoading} isLoading={isLoading} onClick={handleMint}>
          <Trans>Mint</Trans>
        </Button>
      ) : (
        <Flex>
          <Type.Body>
            <Trans>Success</Trans>
          </Type.Body>
          <Type.Body>-</Type.Body>
          <TransactionLink hash={tx} />
        </Flex>
      )}
    </Box>
  )
}

export default MintAction
