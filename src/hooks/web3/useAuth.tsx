import { Web3Provider } from '@ethersproject/providers'
import { Trans } from '@lingui/macro'
import { WalletState } from '@web3-onboard/core'
import { useConnectWallet } from '@web3-onboard/react'
import dayjs from 'dayjs'
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { clearAuth, getStoredWallet, storeAuth } from 'apis/helpers'
import ToastBody from 'components/@ui/ToastBody'
import WaitingWallet, { WaitingState } from 'components/AuthWaitingWallet'
import { BLAST_TESTNET } from 'utils/web3/chains'
import { getSimpleRpcProvider } from 'utils/web3/getRpcUrl'
import { Account } from 'utils/web3/types'

const getAccount = (wallet: WalletState) => wallet.accounts[0] as any as Account

interface ContextValues {
  loading: boolean
  isAuthenticated: boolean | null
  account: Account | null
  updateBalances: () => void
  provider: Web3Provider | null
  blastProvider: Web3Provider
  connect: ({ skipAuth }: { skipAuth?: boolean }) => Promise<Account | null>
  disconnect: () => void
  logout: () => void
  eagerAuth: () => Promise<void>
}

export const AuthContext = createContext({} as ContextValues)

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [{ wallet }, activate, deactivate, updateBalances] = useConnectWallet()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  const authedRef = useRef<boolean>(false)
  const eagerTriggeredRef = useRef<boolean>(false)
  const accountRef = useRef<string | null | undefined>(wallet?.accounts[0].address)
  const [waitingState, setWaitingState] = useState<WaitingState | null>(null)

  const disconnect = useCallback(() => {
    setWaitingState(null)
    setIsAuthenticated(false)
    clearAuth()
    if (!wallet) return
    deactivate({
      label: wallet.label,
    })
  }, [deactivate, wallet])

  useEffect(() => {
    if (!wallet) {
      const { wallet: storedWallet } = getStoredWallet()
      if (storedWallet && authedRef.current) {
        setWaitingState(WaitingState.WalletLocked)
      }
      return
    }
    if (waitingState === WaitingState.WalletLocked) setWaitingState(null)

    const account = getAccount(wallet)
    const { account: storedAccount } = getStoredWallet()
    if (storedAccount && storedAccount !== account.address) {
      setWaitingState(WaitingState.SwitchAccount)
    } else {
      if (waitingState === WaitingState.SwitchAccount) setWaitingState(null)
    }
  }, [waitingState, wallet])

  const auth = useCallback(
    async (wallet: WalletState): Promise<Account | null> => {
      const account = getAccount(wallet)
      setWaitingState(WaitingState.Signing)
      try {
        accountRef.current = account.address
        const time = dayjs().utc().toISOString()
        const provider = new Web3Provider(wallet.provider, 'any')
        sessionStorage.clear()
        storeAuth({
          wallet: wallet.label,
          account: account.address,
        })
        setIsAuthenticated(true)
        setWaitingState(null)
        authedRef.current = true
        return account
      } catch (err: any) {
        console.error(err)
        if (err?.code !== 4001) {
          toast.error(<ToastBody title={err.name} message={err.message} />)
          disconnect()
        } else {
          setWaitingState(WaitingState.CancelSign)
        }
      }
      authedRef.current = true
      return null
    },
    [disconnect]
  )

  const connect = useCallback(
    async ({ skipAuth = false }: { skipAuth?: boolean } = {}) => {
      const [_wallet] = await activate()
      if (!skipAuth) {
        return auth(_wallet)
      }
      return getAccount(_wallet)
    },
    [activate, auth]
  )

  const handleAuth = useCallback(() => {
    if (!wallet) return null
    return auth(wallet)
  }, [auth, wallet])

  const eagerAuth = useCallback(async () => {
    eagerTriggeredRef.current = true

    const { account: storedAccount, wallet: storedWallet } = getStoredWallet()
    if (!storedAccount) {
      setIsAuthenticated(false)
      return
    }
    if (storedWallet) {
      // setWaitingState(WaitingState.Connecting)
      const [_wallet] = await activate({
        autoSelect: {
          label: storedWallet,
          disableModals: true,
        },
      })
      if (!_wallet) {
        disconnect()
        return
      }
      const _account = getAccount(_wallet)
      if (_account.address !== storedAccount) {
        setWaitingState(WaitingState.SwitchAccount)
        return
      }
    }
    try {
      setIsAuthenticated(true)
      setWaitingState(null)
    } catch (error: any) {
      if (error.message.includes('Unauthorized')) {
        if (storedWallet) setWaitingState(WaitingState.TokenExpired)
      } else {
        setWaitingState(null)
        toast.error(<ToastBody title={error.name} message={error.message} />)
      }
      setIsAuthenticated(false)
    }
    authedRef.current = true
  }, [])

  const logout = useCallback(() => {
    disconnect()
  }, [disconnect])

  const contextValue: ContextValues = useMemo(() => {
    return {
      loading: waitingState != null,
      isAuthenticated,
      account: wallet ? getAccount(wallet) : null,
      updateBalances,
      provider: wallet ? new Web3Provider(wallet.provider, 'any') : null,
      blastProvider: new Web3Provider(getSimpleRpcProvider(BLAST_TESTNET) as any),
      connect,
      disconnect,
      logout,
      eagerAuth,
    }
  }, [waitingState, isAuthenticated, wallet, connect, disconnect, logout, eagerAuth])

  return (
    <AuthContext.Provider value={contextValue}>
      {/* {cloneElement(children, { key: myProfile?.id })} */}
      {children}
      {waitingState != null && (
        <WaitingWallet
          active={waitingState != null}
          waitingState={waitingState}
          connect={async () => {
            const { account: storedAccount, wallet: storedWallet } = getStoredWallet()
            if (storedWallet) {
              const [_wallet] = await activate({
                autoSelect: {
                  label: storedWallet,
                  disableModals: true,
                },
              })
              if (!_wallet) {
                disconnect()
                toast.error(
                  <ToastBody title={<Trans>Error</Trans>} message={<Trans>Cannot unlock your wallet</Trans>} />
                )
                return
              }
              const _account = getAccount(_wallet)
              if (_account.address !== storedAccount) {
                setWaitingState(WaitingState.SwitchAccount)
                return
              }
              setWaitingState(null)
            }
          }}
          disconnect={disconnect}
          handleAuth={handleAuth}
        />
      )}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
