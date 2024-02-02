import { BigNumber } from '@ethersproject/bignumber'
import { memo } from 'react'
import create from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { useAuthContext } from 'hooks/web3/useAuth'
import { useERC20Contract } from 'hooks/web3/useContract'
import useContractQuery from 'hooks/web3/useContractQuery'
import { CONTRACT_KEYS } from 'utils/config/keys'
import { DEFAULT_CHAIN_ID } from 'utils/web3/chains'
import { CONTRACT_ADDRESSES } from 'utils/web3/contracts'

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
  const { account } = useAuthContext()
  const USDBContract = useERC20Contract(CONTRACT_ADDRESSES[DEFAULT_CHAIN_ID][CONTRACT_KEYS.USDB], false)
  const BLIContract = useERC20Contract(CONTRACT_ADDRESSES[DEFAULT_CHAIN_ID][CONTRACT_KEYS.LIQUIDITY_VAULT], false)
  useContractQuery<BigNumber>(USDBContract, 'balanceOf', [account?.address], {
    refetchInterval: 5000,
    onSuccess(data) {
      setBalance({ USDB: data })
    },
  })
  useContractQuery<BigNumber>(BLIContract, 'balanceOf', [account?.address], {
    refetchInterval: 5000,
    onSuccess(data) {
      setBalance({ BLI: data })
    },
  })
  return null
})
