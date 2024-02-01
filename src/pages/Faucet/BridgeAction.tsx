import { parseEther } from '@ethersproject/units'
import { Trans } from '@lingui/macro'
import { useState } from 'react'

import TransactionLink from 'components/@ui/TransactionLink'
import { useAuthContext } from 'hooks/web3/useAuth'
import { useContract } from 'hooks/web3/useContract'
import useContractMutation from 'hooks/web3/useContractMutation'
import useERC20Approval from 'hooks/web3/useTokenApproval'
import { Button } from 'theme/Buttons'
import { Box, Flex, Type } from 'theme/base'
import { CONTRACT_KEYS } from 'utils/config/keys'
import { BLAST_TESTNET, SEPOLIA } from 'utils/web3/chains'
import { CONTRACT_ADDRESSES } from 'utils/web3/contracts'

const BridgeAction = () => {
  const { account } = useAuthContext()

  const [tx, setTx] = useState<string>()

  const BridgeContract = useContract({
    contract: {
      address: CONTRACT_ADDRESSES[SEPOLIA][CONTRACT_KEYS.BRIDGE],
      abi: ['function bridgeERC20(address,address,uint256,uint32,bytes) external'],
    },
    withSignerIfPossible: true,
  })
  const { isTokenAllowanceEnough, approving, approveToken } = useERC20Approval({
    token: CONTRACT_ADDRESSES[SEPOLIA][CONTRACT_KEYS.USDB],
    account: account?.address,
    spender: CONTRACT_ADDRESSES[SEPOLIA][CONTRACT_KEYS.BRIDGE],
  })
  const { isLoading, mutate } = useContractMutation(BridgeContract)
  const handleBridge = async () => {
    if (!account) return
    mutate(
      {
        method: 'bridgeERC20',
        params: [
          CONTRACT_ADDRESSES[SEPOLIA][CONTRACT_KEYS.USDB],
          CONTRACT_ADDRESSES[BLAST_TESTNET][CONTRACT_KEYS.USDB],
          parseEther('10000'),
          500000, // gas limit
          0,
        ],
      },
      {
        onSuccess: (data) => {
          setTx(data.transactionHash)
        },
      }
    )
  }
  const approvedEnough = isTokenAllowanceEnough(10000)
  return (
    <Box mt={3}>
      {!tx ? (
        <Flex sx={{ gap: 3 }}>
          <Button
            variant="primary"
            block
            disabled={approvedEnough || approving}
            isLoading={approving}
            onClick={() => approveToken(10000)}
          >
            <Trans>Approve</Trans>
          </Button>
          <Button
            variant="primary"
            block
            disabled={isLoading || approving || !approvedEnough}
            isLoading={isLoading}
            onClick={handleBridge}
          >
            <Trans>Bridge</Trans>
          </Button>
        </Flex>
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

export default BridgeAction
