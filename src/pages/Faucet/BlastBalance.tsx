import { BigNumber } from '@ethersproject/bignumber'
import { Web3Provider } from '@ethersproject/providers'
import { formatEther } from '@ethersproject/units'
import { CoinVertical } from '@phosphor-icons/react'
import { useMemo } from 'react'

import { useAuthContext } from 'hooks/web3/useAuth'
import { useContract } from 'hooks/web3/useContract'
import useContractQuery from 'hooks/web3/useContractQuery'
import { Box, Flex, IconBox, Type } from 'theme/base'
import { CONTRACT_KEYS } from 'utils/config/keys'
import { generateClipPath } from 'utils/helpers/css'
import { formatNumber } from 'utils/helpers/format'
import { BLAST_TESTNET } from 'utils/web3/chains'
import { CONTRACT_ABIS, CONTRACT_ADDRESSES } from 'utils/web3/contracts'
import { getSimpleRpcProvider } from 'utils/web3/getRpcUrl'

const BlastBalance = () => {
  const { account } = useAuthContext()
  const blastRpcProvider = useMemo(() => new Web3Provider(getSimpleRpcProvider(BLAST_TESTNET) as any), [])
  const USDBContract = useContract({
    contract: {
      address: CONTRACT_ADDRESSES[BLAST_TESTNET][CONTRACT_KEYS.USDB],
      abi: CONTRACT_ABIS[CONTRACT_KEYS.USDB],
    },
    withSignerIfPossible: false,
    provider: blastRpcProvider,
  })
  const { data: balance } = useContractQuery<BigNumber>(USDBContract, 'balanceOf', [account?.address], {
    refetchInterval: 5000,
  })
  return (
    <Flex sx={{ alignItems: 'center', justifyContent: 'center', gap: 2 }}>
      <IconBox
        sx={{
          flexShrink: 0,
          p: 2,
          clipPath: generateClipPath({ diffX: 16, diffY: 8 }),
          color: 'primary1',
          bg: '#B7ED1C1A',
        }}
        icon={<CoinVertical size={24} />}
      />
      <Type.BodyBold>
        Your Blast L2 balance:{' '}
        <Box as="span" color="primary1">
          {balance ? formatNumber(formatEther(balance)) : '--'} USDB
        </Box>
      </Type.BodyBold>
    </Flex>
  )
}

export default BlastBalance
