import { BigNumber } from '@ethersproject/bignumber'
import { Web3Provider } from '@ethersproject/providers'
import { formatEther } from '@ethersproject/units'
import { useMemo } from 'react'

import { useAuthContext } from 'hooks/web3/useAuth'
import { useContract } from 'hooks/web3/useContract'
import useContractQuery from 'hooks/web3/useContractQuery'
import { Type } from 'theme/base'
import { CONTRACT_KEYS } from 'utils/config/keys'
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
  console.log('balance', balance?.toString())
  return <Type.Body mt={3}>Your Blast L2 balance: {balance ? formatNumber(formatEther(balance)) : '--'} USDB</Type.Body>
}

export default BlastBalance
