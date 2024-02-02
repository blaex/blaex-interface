import { BigNumber } from '@ethersproject/bignumber'
import { memo } from 'react'
import create from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { useAuthContext } from 'hooks/web3/useAuth'
import { useContract } from 'hooks/web3/useContract'
import useContractQuery from 'hooks/web3/useContractQuery'
import { CONTRACT_KEYS } from 'utils/config/keys'
import { BLAST_TESTNET } from 'utils/web3/chains'
import { CONTRACT_ABIS, CONTRACT_ADDRESSES } from 'utils/web3/contracts'

interface BalancesState {
  balances: { [key: string]: BigNumber | null }
  setBalance: (balance: { [key: string]: BigNumber | null }) => void
  setBalances: (balance: { [key: string]: BigNumber | null }) => void
}

const useBalancesStore = create<BalancesState>()(
  immer((set) => ({
    balances: {},
    setBalance: (balance) =>
      set((state) => {
        state.balances = { ...state.balances, ...balance }
      }),
    setBalances: (balance) =>
      set((state) => {
        state.balances = balance
      }),
  }))
)
export default useBalancesStore

export const InitBalancesStore = memo(function InitBlastBalanceStore() {
  const setBalance = useBalancesStore((state) => state.setBalance)
  const { account, blastProvider } = useAuthContext()
  const USDBContract = useContract({
    contract: {
      address: CONTRACT_ADDRESSES[BLAST_TESTNET][CONTRACT_KEYS.USDB],
      abi: CONTRACT_ABIS[CONTRACT_KEYS.USDB],
    },
    withSignerIfPossible: false,
    provider: blastProvider,
  })
  useContractQuery<BigNumber>(USDBContract, 'balanceOf', [account?.address], {
    refetchInterval: 5000,
    onSuccess(data) {
      setBalance({ USDB: data })
    },
  })
  return null
})
