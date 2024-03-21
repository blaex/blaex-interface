import { Result } from '@ethersproject/abi'
import { TransactionReceipt } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import { Contract } from '@ethersproject/contracts'
import { Provider, Web3Provider } from '@ethersproject/providers'

import ERC20_ABI from 'abis/ERC20.json'
import LIQUIDITY_VAULT_ABI from 'abis/LiquidityVault.json'
import MULTICALL_ABI from 'abis/Multicall.json'
import PERPS_MARKET_ABI from 'abis/PerpsMarket.json'
import USDB_ABI from 'abis/USDB.json'
import { CONTRACT_KEYS } from 'utils/config/keys'
import { ContractInfo } from 'utils/web3/types'

import { BLAST_MAINNET, BLAST_TESTNET, SEPOLIA } from './chains'

export interface ContractKey {
  key: string
  chainId: number
}

export const CONTRACT_ABIS: {
  [key: string]: any
} = {
  [CONTRACT_KEYS.MULTICALL]: MULTICALL_ABI,
  [CONTRACT_KEYS.USDB]: USDB_ABI,
  [CONTRACT_KEYS.ERC20]: ERC20_ABI,
  [CONTRACT_KEYS.LIQUIDITY_VAULT]: LIQUIDITY_VAULT_ABI,
  [CONTRACT_KEYS.PERPS_MARKET]: PERPS_MARKET_ABI,
}

export const CONTRACT_ADDRESSES: {
  [key: number]: {
    [key: string]: string
  }
} = {
  [SEPOLIA]: {
    [CONTRACT_KEYS.MULTICALL]: '0xcA11bde05977b3631167028862bE2a173976CA11',
    [CONTRACT_KEYS.BRIDGE]: '0xc644cc19d2A9388b71dd1dEde07cFFC73237Dca8',
    [CONTRACT_KEYS.USDB]: '0x7f11f79DEA8CE904ed0249a23930f2e59b43a385',
  },
  [BLAST_TESTNET]: {
    [CONTRACT_KEYS.MULTICALL]: '0xcA11bde05977b3631167028862bE2a173976CA11',
    [CONTRACT_KEYS.LIQUIDITY_VAULT]: '0x909f03AD2fa1b7b351aB84b161a68F49970A56e4',
    [CONTRACT_KEYS.PERPS_VAULT]: '0x19d979c24dA579E3fBd5D98c4AeA09901Fa1C7a1',
    [CONTRACT_KEYS.USDB]: '0x4200000000000000000000000000000000000022',
    [CONTRACT_KEYS.PERPS_MARKET]: '0x7A12e4D6ff1391fb3a9A96393713D82Fc6Dc2aea',
  },
  [BLAST_MAINNET]: {
    [CONTRACT_KEYS.MULTICALL]: '0xcA11bde05977b3631167028862bE2a173976CA11',
    [CONTRACT_KEYS.LIQUIDITY_VAULT]: '0x6aCD1Ac7eeEa7783E805a1c4E31c85A4535d682B',
    [CONTRACT_KEYS.PERPS_VAULT]: '0xeb452323b4bFb289867D21cAa524535F443a5904',
    [CONTRACT_KEYS.USDB]: '0x4300000000000000000000000000000000000003',
    [CONTRACT_KEYS.PERPS_MARKET]: '0x466395686a7217240B64Ea79163BeA82084058E6',
    // [CONTRACT_KEYS.PERPS_MARKET]: '0x8DA098F5eA19050FC058c70bcE078eea9fC4e43D',
  },
}

export function isAddress(value: any): string {
  try {
    return getAddress(value)
  } catch {
    return ''
  }
}

// account is not optional
export function getSigner(provider: Web3Provider, account: string): Signer {
  return provider.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(provider: Web3Provider, account?: string | null): Provider | Signer {
  return account ? getSigner(provider, account) : provider
}

// account is optional
export function getContract(contract: ContractInfo, signer: Signer | Provider): Contract {
  const { address, abi } = contract
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, abi, signer)
}

export const getMulticallContract = (chainId: number, provider: Signer | Provider) => {
  return getContract({ address: CONTRACT_ADDRESSES[chainId]['MULTICALL'], abi: MULTICALL_ABI }, provider)
}

export const getResultFromReceipt = (receipt: TransactionReceipt, contract: Contract): Result | null => {
  const log = receipt.logs.find((e) => e.address === contract.address && e.transactionHash === receipt.transactionHash)
  if (!log) return null

  const data = contract.interface.parseLog(log)
  if (!data?.args.length) return null
  return data.args
}

export const BLOCK_WAITING_SECONDS: {
  [key: number]: number
} = {
  [BLAST_TESTNET]: 12,
}

export const getDelayTime = (chainId: number) => {
  return (BLOCK_WAITING_SECONDS[chainId] ?? 6) * 1000
}
