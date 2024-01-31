import injectedModule, { ProviderLabel } from '@web3-onboard/injected-wallets'
// import ledgerModule from '@web3-onboard/ledger'
import { Web3OnboardProvider, init } from '@web3-onboard/react'
import walletConnectModule from '@web3-onboard/walletconnect'
import React from 'react'

import { AuthProvider } from 'hooks/web3/useAuth'
import { themeColors } from 'theme/colors'
import themeFn from 'theme/theme'
import { APP_URL, FONT_FAMILY } from 'utils/config/constants'
import { DEFAULT_CHAIN_ID, SUPPORTED_CHAIN_IDS, chains } from 'utils/web3/chains'

const theme = themeFn(true)

// const ledger = ledgerModule({
//   projectId: '4ed591829f849797c6391880fa61d5e4',
//   requiredChains: SUPPORTED_CHAIN_IDS,
//   walletConnectVersion: 2,
// })

const walletConnect = walletConnectModule({
  projectId: '4ed591829f849797c6391880fa61d5e4',
  requiredChains: [DEFAULT_CHAIN_ID],
  optionalChains: SUPPORTED_CHAIN_IDS,
  dappUrl: APP_URL,
})

const injected = injectedModule({
  filter: {
    [ProviderLabel.Detected]: false,
    [ProviderLabel.RoninWallet]: false,
  },
  displayUnavailable: [
    ProviderLabel.MetaMask,
    ProviderLabel.Brave,
    ProviderLabel.Coinbase,
    ProviderLabel.Trust,
    ProviderLabel.Coin98Wallet,
  ],
  sort(wallets) {
    const metaMask = wallets.find(({ label }) => label === ProviderLabel.MetaMask)
    return (
      [metaMask, ...wallets.filter(({ label }) => label !== ProviderLabel.MetaMask)]
        // remove undefined values
        .filter((wallet) => wallet) as any
    )
  },
})

const web3Onboard = init({
  theme: {
    '--w3o-background-color': theme.colors.background2,
    '--w3o-foreground-color': theme.colors.neutral8,
    '--w3o-text-color': theme.colors.neutral2,
    '--w3o-border-color': 'transparent',
    '--w3o-action-color': theme.colors.primary1,
    '--w3o-border-radius': theme.borderRadius.xs,
    '--w3o-font-family': FONT_FAMILY,
  },
  wallets: [walletConnect, injected],
  chains,
  appMetadata: {
    name: 'Blaex',
    icon: `
      <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M0.0515747 10.4955V9.75966H9.83614L9.83327 10.4955H0.0515747ZM9.83834 9.19346H0.0515747V8.54189H9.84088L9.83834 9.19346ZM0.0515747 12.2794V13.0155H5.29822V12.2794H0.0515747ZM0.0515747 11.7132H5.29822V11.0617H0.0515747V11.7132ZM0.0515747 15.5353V14.7992H9.84624V15.5353H0.0515747ZM9.84624 14.233H0.0515747V13.5817H5.29822V13.9241H9.84624V14.233ZM3.01253 17.3192L4.5047 18.1279H9.84624V17.3192H3.01253ZM1.96781 16.753L0.765559 16.1015H9.84624V16.753H1.96781ZM9.84309 7.97569H0.0515747V7.16699H9.84624L9.84309 7.97569Z" fill="#B7ED1C"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M15.6141 19.1523H10.7L10.7007 19.8208H15.6141L15.6141 19.1523ZM10.7034 22.3406L10.7026 21.6048H25.575V22.3406H10.7034ZM25.575 21.0386H10.702L10.7013 20.387H15.6141L15.6141 21.0382H25.575V21.0386ZM12.9378 24.1245L14.213 24.8606H25.575V24.1245H12.9378ZM11.9569 23.5583L10.8281 22.9068H25.575V23.5583H11.9569Z" fill="#B7ED1C"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0V4.25195H10.7188V18.1599H25.601V9.50812L21.408 7.17538H15.9748V2.48038L11.457 0H0ZM20.679 11.3481H15.9562V14.4331H20.679V11.3481Z" fill="#B7ED1C"/>
      </svg>
    `,
    description: 'A leading tool to analyze and copy the best on-chain traders',
    recommendedInjectedWallets: [
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
      { name: 'MetaMask', url: 'https://metamask.io' },
    ],
  },
  disableFontDownload: true,
  accountCenter: {
    desktop: {
      enabled: false,
    },
    mobile: {
      enabled: false,
    },
  },
})

const DappProvider = ({ children }: { children: any }): JSX.Element => {
  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <AuthProvider>{children}</AuthProvider>
    </Web3OnboardProvider>
  )
}

export default DappProvider
