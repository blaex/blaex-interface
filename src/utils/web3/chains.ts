import { NETWORK } from 'utils/config/constants'
import { Chain, NativeCurrency } from 'utils/web3/types'

export const SEPOLIA = 11155111
export const BLAST_MAINNET = 81457
export const BLAST_TESTNET = 168587773
export const DEFAULT_CHAIN_ID = NETWORK === 'mainnet' ? BLAST_MAINNET : BLAST_TESTNET
export const FAUCET_CHAIN_ID = SEPOLIA

export const SUPPORTED_CHAIN_IDS: number[] = NETWORK === 'mainnet' ? [BLAST_MAINNET] : [SEPOLIA, BLAST_TESTNET]

const NATIVE_CURRENCIES: { [key: string]: NativeCurrency } = {
  ETH: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
}

const SECONDARY_TOKENS: {
  [key: number]: {
    address: string
    icon?: string
  }[]
} = {
  [SEPOLIA]: [
    {
      address: '0x7f11f79DEA8CE904ed0249a23930f2e59b43a385',
    },
  ],
  [BLAST_TESTNET]: [
    {
      address: '0x4200000000000000000000000000000000000022',
    },
  ],
  [BLAST_MAINNET]: [
    {
      address: '0x4300000000000000000000000000000000000003',
    },
  ],
}

const CHAINS: { [key: number]: Chain } = {
  [SEPOLIA]: {
    id: `0x${SEPOLIA.toString(16)}`,
    token: NATIVE_CURRENCIES.ETH.symbol,
    label: 'Sepolia',
    icon: 'ETH',
    rpcUrl: 'https://ethereum-sepolia.publicnode.com',
    blockExplorerUrl: 'https://sepolia.etherscan.io',
    secondaryTokens: SECONDARY_TOKENS[SEPOLIA],
  },
  [BLAST_TESTNET]: {
    id: `0x${BLAST_TESTNET.toString(16)}`,
    token: NATIVE_CURRENCIES.ETH.symbol,
    label: 'Blast Tesnet',
    icon: 'BLAST',
    rpcUrl: 'https://sepolia.blast.io',
    blockExplorerUrl: 'https://testnet.blastscan.io',
    secondaryTokens: SECONDARY_TOKENS[BLAST_TESTNET],
  },
  [BLAST_MAINNET]: {
    id: `0x${BLAST_MAINNET.toString(16)}`,
    token: NATIVE_CURRENCIES.ETH.symbol,
    label: 'Blast Mainnet',
    icon: 'BLAST',
    rpcUrl: 'https://rpc.blast.io',
    blockExplorerUrl: 'https://blastscan.io',
    secondaryTokens: SECONDARY_TOKENS[BLAST_MAINNET],
  },
}

const chains = SUPPORTED_CHAIN_IDS.map((id) => CHAINS[id])

const getChainMetadata = (chainId: number, rpcUrls?: string[]) => {
  const chain = CHAINS[chainId] ?? {
    id: `0x${chainId.toString(16)}`,
  }
  if (rpcUrls) return { ...chain, rpcUrls }
  return chain
}

export { NATIVE_CURRENCIES, CHAINS, chains, getChainMetadata }
