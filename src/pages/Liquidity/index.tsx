import { BigNumber } from '@ethersproject/bignumber'
import { Web3Provider } from '@ethersproject/providers'
import { formatEther, parseEther } from '@ethersproject/units'
import { Trans } from '@lingui/macro'
import { ArrowsDownUp } from '@phosphor-icons/react'
import { ReactNode, useState } from 'react'

import CustomPageTitle from 'components/@ui/CustomPageTitle'
import Divider from 'components/@ui/Divider'
import { useClickLoginButton } from 'components/LoginAction'
import NumberInput from 'components/NumberInput'
import { parseInputValue } from 'components/NumberInput/helpers'
import useBalancesStore from 'hooks/store/useBalancesManagement'
import { useLiquidityVaultContract } from 'hooks/web3/useContract'
import useContractMutation from 'hooks/web3/useContractMutation'
import useContractQuery from 'hooks/web3/useContractQuery'
import useMulticallQuery from 'hooks/web3/useMulticallQuery'
import useERC20Approval from 'hooks/web3/useTokenApproval'
import useWeb3 from 'hooks/web3/useWeb3'
import { Button } from 'theme/Buttons'
import Loading from 'theme/Loading'
import { Box, Flex, Image, Type } from 'theme/base'
import { CONTRACT_KEYS } from 'utils/config/keys'
import { generateClipPath } from 'utils/helpers/css'
import { formatNumber } from 'utils/helpers/format'
import { parseMarketImageSrc } from 'utils/helpers/transform'
import { DEFAULT_CHAIN_ID } from 'utils/web3/chains'
import { CONTRACT_ABIS, CONTRACT_ADDRESSES } from 'utils/web3/contracts'

export default function LiquidityPage() {
  return (
    <>
      <CustomPageTitle title="Blaex" />
      <Box sx={{ width: '100%', maxWidth: 1000, mx: 'auto' }}>
        <Box height={48} />
        <Type.H1 mb={2}>
          <Trans>Liquidity</Trans>
        </Type.H1>
        <Type.Body color="neutral5" mb={24}>
          <Trans>Purchase BLI tokens to earn ETH fees from swaps and leverage trading.</Trans>
        </Type.Body>
        <Flex sx={{ width: '100%', gap: 2, '& > *': { flex: 1 }, alignItems: 'start' }}>
          <Overview />
          <Form />
        </Flex>
      </Box>
    </>
  )
}

function Overview() {
  const { publicProvider } = useWeb3()
  const { data } = useMulticallQuery<BigNumber[][], any, number[]>(
    CONTRACT_ABIS[CONTRACT_KEYS.LIQUIDITY_VAULT],
    [
      {
        address: CONTRACT_ADDRESSES[DEFAULT_CHAIN_ID][CONTRACT_KEYS.LIQUIDITY_VAULT],
        name: 'totalSupply',
        params: [],
      },
      {
        address: CONTRACT_ADDRESSES[DEFAULT_CHAIN_ID][CONTRACT_KEYS.LIQUIDITY_VAULT],
        name: 'getTotalPooledToken',
        params: [],
      },
    ],
    DEFAULT_CHAIN_ID,
    {
      select: (data) => data.map((item) => Number(formatEther(item[0]))),
    }
  )
  const totalSupply = data?.[0]
  const totalToken = data?.[1]
  return (
    <Box sx={{ bg: 'background2', borderRadius: 'sm', p: 3 }}>
      <Flex sx={{ alignItems: 'center', gap: 3 }}>
        <TokenWrapper symbol="BLI" size={48} hasText={false} />
        <Box>
          <Type.Body sx={{ display: 'block' }}>BLI</Type.Body>
          <Type.Caption color="neutral5">
            <Trans>Blaex Liquidity Index</Trans>
          </Type.Caption>
        </Box>
      </Flex>
      <Divider my={3} />
      <Stats
        label={<Trans>Price</Trans>}
        value={totalToken && totalSupply ? `$${formatNumber(totalToken / totalSupply, 2, 2)}` : '--'}
      />
      <Box mb={2} />
      <Stats
        label={<Trans>Total Supply</Trans>}
        value={`${totalSupply ? formatNumber(totalSupply, 2, 2) : '--'} ($${
          totalToken ? formatNumber(totalToken, 2, 2) : '--'
        })`}
      />
      <Divider my={3} />
      <Stats label={<Trans>Protocol Yield APR</Trans>} value={`${formatNumber(12.33)}%`} />
      <Box mb={2} />
      <Stats label={<Trans>Blast Native Yield APR</Trans>} value={`${formatNumber(12.33)}%`} />
    </Box>
  )
}

function Stats({ label, value }: { label: ReactNode; value: ReactNode }) {
  return (
    <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
      <Type.Caption color="neutral4">{label}</Type.Caption>
      <Type.CaptionBold>{value}</Type.CaptionBold>
    </Flex>
  )
}

const TABS = [
  { label: 'Buy BLI', value: 'buy' },
  { label: 'Sell BLI', value: 'sell' },
]
type TabOption = (typeof TABS)[0]
const DEFAULT_TAB = TABS[0]

function Form() {
  const { walletAccount, walletProvider, publicProvider } = useWeb3()
  const login = useClickLoginButton()
  const [currentTab, setTab] = useState(DEFAULT_TAB)
  const [amount, setAmount] = useState<string | undefined>(undefined)
  const amountIn = parseInputValue(amount)
  const isBuy = currentTab.value === DEFAULT_TAB.value
  const LiquidityVaultContract = useLiquidityVaultContract({
    provider: walletProvider ?? (publicProvider as Web3Provider),
    withSignerIfPossible: true,
  })
  const { data: amountOut, isLoading: loadingAmountOut } = useContractQuery<BigNumber>(
    LiquidityVaultContract,
    isBuy ? 'getSharesByPooledToken' : 'getPooledTokenByShares',
    [parseEther(amountIn.toString())],
    {
      enabled: amountIn > 0,
    }
  )
  const { isTokenAllowanceEnough, approving, approveToken } = useERC20Approval({
    token: CONTRACT_ADDRESSES[DEFAULT_CHAIN_ID][CONTRACT_KEYS.USDB],
    account: walletAccount?.address,
    spender: CONTRACT_ADDRESSES[DEFAULT_CHAIN_ID][CONTRACT_KEYS.LIQUIDITY_VAULT],
  })

  const { isLoading: submitting, mutate } = useContractMutation(LiquidityVaultContract)

  const approvedEnough = !isBuy || isTokenAllowanceEnough(amountIn)

  return (
    <Box>
      <TabHeader currentTab={currentTab} onChangeTab={(option) => setTab(option)} />
      <Box variant="cardPolygon" sx={{ bg: 'neutral7' }}>
        <Flex sx={{ gap: 2 }}>
          <Box>
            <Type.Body mb={3}>Pay</Type.Body>
            <NumberInput
              placeholder="0.0"
              value={amount}
              onValueChange={(e) => setAmount(e.target.value)}
              sx={{
                '&:focus-within:not([disabled])': {
                  bg: 'neutral7',
                },
                '&:hover:not([disabled]),&:focus:not([disabled])': {
                  bg: 'neutral7',
                },
              }}
            />
          </Box>
          {isBuy ? <USDBToken /> : <BLIToken />}
        </Flex>
      </Box>
      <ArrowSymbol />
      <Box mb={3} variant="cardPolygon" sx={{ bg: 'neutral7' }}>
        <Flex sx={{ gap: 2 }}>
          <Box flex="1">
            <Type.Body mb={3}>Receive</Type.Body>
            <Type.H3 color="neutral1" sx={{ fontWeight: 'normal', textAlign: 'left' }}>
              {loadingAmountOut ? (
                <Box width={24}>
                  <Loading size={20} />
                </Box>
              ) : amountOut == null ? (
                '--'
              ) : !amountOut.isZero() ? (
                formatNumber(formatEther(amountOut))
              ) : (
                formatNumber(amountIn)
              )}
            </Type.H3>
          </Box>
          {isBuy ? <BLIToken /> : <USDBToken />}
        </Flex>
      </Box>
      {walletAccount ? (
        <SubmitButton
          isLoading={approving || submitting}
          disabled={approving || submitting}
          text={<>{isBuy ? approvedEnough ? <Trans>Buy</Trans> : <Trans>Approve</Trans> : <Trans>Sell</Trans>}</>}
          onSubmit={() => {
            if (approvedEnough) {
              mutate(
                { method: isBuy ? 'deposit' : 'withdraw', params: [parseEther(amountIn.toString())] },
                {
                  onSuccess: () => setAmount(undefined),
                }
              )
              return
            }
            approveToken(amountIn)
          }}
        />
      ) : (
        <Button
          variant="primary"
          sx={{
            width: '100%',
            height: 50,
            border: 'none',
            borderRadius: 0,
          }}
          onClick={() => login()}
        >
          <Trans>Connect Wallet</Trans>
        </Button>
      )}
    </Box>
  )
}
function TabHeader({ currentTab, onChangeTab }: { currentTab: TabOption; onChangeTab: (option: TabOption) => void }) {
  return (
    <Flex mb={3} sx={{ borderBottom: 'small', borderBottomColor: 'neutral1', '& > *': { flex: 1 } }}>
      {TABS.map((tab) => {
        const isActive = currentTab.value === tab.value
        return (
          <Box
            key={tab.value}
            role="button"
            sx={{
              height: 48,
              lineHeight: '48px',
              fontWeight: 600,
              bg: isActive ? 'neutral1' : 'transparent',
              color: isActive ? 'neutral8' : 'neutral4',
              textAlign: 'center',
              clipPath: generateClipPath({ type: '1tr' }),
              transition: '0.3s',
            }}
            onClick={() => onChangeTab(tab)}
          >
            {tab.label}
          </Box>
        )
      })}
    </Flex>
  )
}

function USDBToken() {
  const { USDB } = useBalancesStore((state) => state.balances)
  return (
    <Flex sx={{ flexShrink: 0, flexDirection: 'column', alignItems: 'end' }}>
      <Type.Body mb={3}>Balance: {USDB ? formatNumber(formatEther(USDB)) + ' USDB' : '--'}</Type.Body>
      <Flex sx={{ gap: 2, height: 40, alignItems: 'center' }}>
        <TokenWrapper symbol="USDB" />
      </Flex>
    </Flex>
  )
}
function BLIToken() {
  const { BLI } = useBalancesStore((state) => state.balances)
  return (
    <Flex sx={{ flexShrink: 0, flexDirection: 'column', alignItems: 'end' }}>
      <Type.Body mb={3}>Balance: {BLI ? formatNumber(formatEther(BLI)) + ' BLI' : '--'}</Type.Body>
      <Flex sx={{ gap: 2, height: 40, alignItems: 'center' }}>
        <TokenWrapper symbol="BLI" />
      </Flex>
    </Flex>
  )
}
function TokenWrapper({ symbol, size, hasText = true }: { symbol: string; size?: number; hasText?: boolean }) {
  return (
    <Flex sx={{ gap: 2 }}>
      <Image src={parseMarketImageSrc(symbol)} width={size ?? 32} height={size ?? 32} />
      {hasText && <Type.H5 sx={{ fontWeight: 'normal' }}>{symbol}</Type.H5>}
    </Flex>
  )
}

function SubmitButton({
  text,
  disabled,
  isLoading,
  onSubmit,
}: {
  text: ReactNode
  disabled?: boolean
  isLoading?: boolean
  onSubmit: () => void
}) {
  return (
    <Button
      variant="primary"
      disabled={disabled}
      isLoading={isLoading}
      sx={{
        width: '100%',
        height: 50,
        border: 'none',
        borderRadius: 0,
      }}
      onClick={onSubmit}
    >
      {text}
    </Button>
  )
}

function ArrowSymbol() {
  return (
    <Flex sx={{ height: 16, alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
      <Box
        sx={{
          bg: 'primary1',
          p: 2,
          height: 40,
          width: 40,
          color: 'neutral8',
          clipPath: generateClipPath({ diffX: 16, diffY: 8 }),
        }}
      >
        <ArrowsDownUp size={24} />
      </Box>
    </Flex>
  )
}
