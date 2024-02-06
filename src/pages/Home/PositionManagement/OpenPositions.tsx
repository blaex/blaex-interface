import { BigNumber } from '@ethersproject/bignumber'
import { Web3Provider } from '@ethersproject/providers'
import { UseMutationResult } from 'react-query'

import TokenWrapper from 'components/@ui/TokenWrapper'
import { LiquidatePrice, MarketPrice, OpeningPnL } from 'components/renderProps'
import Num from 'entities/Num'
import { Position } from 'entities/Position'
import { usePerpsMarketContract } from 'hooks/web3/useContract'
import useContractMutation from 'hooks/web3/useContractMutation'
import useContractQuery from 'hooks/web3/useContractQuery'
import useWeb3 from 'hooks/web3/useWeb3'
import Table from 'theme/Table'
import { Box, Flex, Type } from 'theme/base'
import { formatNumber } from 'utils/helpers/format'

import ClosePosition from './ClosePosition'

export default function OpenPositions() {
  const { walletAccount, walletProvider, publicProvider } = useWeb3()
  const PerpsMarketContract = usePerpsMarketContract({ provider: walletProvider ?? (publicProvider as Web3Provider) })

  const { data: openPositions } = useContractQuery<any[][], any, Position[]>(
    PerpsMarketContract,
    'getOpenPositions',
    [walletAccount?.address],
    {
      select: (data: any[][]) => {
        if (!data || data.length === 0) return []
        const defaultValue = new Num(BigNumber.from(0))
        return data.map((op) => {
          return {
            id: op[0]?.toNumber() ?? defaultValue,
            account: op[1],
            market: op[2]?.toNumber() ?? defaultValue,
            collateralToken: op[3],
            sizeInUsd: op[4] ? new Num(op[4]) : defaultValue,
            sizeInToken: op[5] ? new Num(op[5]) : defaultValue,
            collateralInUsd: op[6] ? new Num(op[6]) : defaultValue,
            realisedPnl: op[7] ? new Num(op[7]) : defaultValue,
            paidFunding: op[8] ? new Num(op[8]) : defaultValue,
            latestInteractionFunding: op[9] ? new Num(op[9]) : defaultValue,
            paidFees: op[10] ? new Num(op[10]) : defaultValue,
            isLong: op[11],
            isClose: op[12],
          }
        })
      },
      refetchInterval: 3000,
      enabled: !!walletAccount?.address,
    }
  )
  const mutation = useContractMutation(PerpsMarketContract)
  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <Table data={openPositions} restrictHeight isLoading={false} columns={columns} externalSource={mutation} />
    </Box>
  )
}

const columns: any = [
  {
    title: 'Market',
    dataIndex: 'market',
    key: 'market',
    style: { minWidth: '150px', textAlign: 'left' },
    render: (item: Position) => {
      const leverage = `${formatNumber(item.sizeInUsd.num / item.collateralInUsd.num)}x`
      return (
        <Flex alignItems="center" justifyContent="start" sx={{ gap: 2 }}>
          <TokenWrapper symbol="ETH" size={24} hasText={false} />
          <Flex flexDirection="column" sx={{ gap: 1 }}>
            <Type.Small display="block">ETH/USD</Type.Small>
            <Flex alignItems="center" sx={{ gap: 1 }}>
              {item.isLong ? (
                <Type.Small color="system2">Long {leverage}</Type.Small>
              ) : (
                <Type.Small color="system1">Short {leverage}</Type.Small>
              )}
              <Type.Small></Type.Small>
            </Flex>
          </Flex>
        </Flex>
      )
    },
  },
  {
    title: 'Market Price',
    dataIndex: 'price',
    key: 'price',
    style: { minWidth: '100px', textAlign: 'right' },
    render: (item: Position) => {
      return (
        <Type.Small>
          <MarketPrice market={item.market === 1 ? 'ETHUSD' : 'BTCUSD'} fontInherit />
        </Type.Small>
      )
    },
  },
  {
    title: 'Collateral',
    dataIndex: 'collateral',
    key: 'collateral',
    style: { minWidth: '100px', textAlign: 'right' },
    render: (item: Position) => {
      return <Type.Small>${formatNumber(item.collateralInUsd.num, 2, 2)}</Type.Small>
    },
  },
  {
    title: 'Size',
    dataIndex: 'size',
    key: 'size',
    style: { minWidth: '180px', textAlign: 'right' },
    render: (item: Position) => {
      return (
        <Flex sx={{ width: '100%', justifyContent: 'end', gap: 3 }}>
          <Flex flexDirection="column" sx={{ gap: 1 }}>
            <Type.Small display="block">${formatNumber(item.sizeInUsd.num, 2, 2)}</Type.Small>
            <Type.Small color="neutral5">{formatNumber(item.sizeInToken.num, 4, 4)} ETH</Type.Small>
          </Flex>
          {/* <Button variant="normal" p={2} height={40}>
            <Pencil size={20} />
          </Button> */}
        </Flex>
      )
    },
  },
  {
    title: 'Entry Price',
    dataIndex: 'entryPrice',
    key: 'entryPrice',
    style: { minWidth: '130px', textAlign: 'right' },
    render: (item: any) => {
      return <Type.Small>${formatNumber(item.sizeInUsd.num / item.sizeInToken.num, 2, 2)}</Type.Small>
    },
  },
  {
    title: 'Est.Liq.Price',
    dataIndex: 'liquidatePrice',
    key: 'liquidatePrice',
    style: { minWidth: '130px', textAlign: 'right' },
    render: (item: Position) => {
      return (
        <Type.Small>
          <LiquidatePrice data={item} fontInherit />
        </Type.Small>
      )
    },
  },
  {
    title: 'PnL',
    dataIndex: 'liquidatePrice',
    key: 'liquidatePrice',
    style: { minWidth: '100px', textAlign: 'right' },
    render: (item: Position) => {
      return <OpeningPnL data={item} />
    },
  },
  // {
  //   title: 'TP / SL',
  //   dataIndex: undefined,
  //   key: undefined,
  //   style: { minWidth: '180px', textAlign: 'right' },
  //   render: (item: any) => {
  //     return (
  //       <Flex sx={{ width: '100%', justifyContent: 'end', gap: 3 }}>
  //         <Box>
  //           <Type.Small display="block">${formatNumber(123123)}</Type.Small>
  //           <Type.Small>{formatNumber(123123)}ETH</Type.Small>
  //         </Box>
  //         <Button variant="normal" p={2} height={40}>
  //           <Pencil size={20} />
  //         </Button>
  //       </Flex>
  //     )
  //   },
  // },
  {
    title: '',
    dataIndex: 'action',
    key: 'action',
    style: { minWidth: '100px', textAlign: 'right' },
    render: (item: Position, index: number, mutation: UseMutationResult) => {
      return (
        <Box pr={3}>
          <ClosePosition position={item} mutation={mutation} />
        </Box>
      )
    },
  },
  // {
  //   title: '',
  //   dataIndex: undefined,
  //   key: undefined,
  //   style: { minWidth: '100px', textAlign: 'right' },
  //   render: (item: any) => {
  //     return (
  //       <Box pr={3}>
  //         <Button variant="normal" p={2} height={40}>
  //           <Export size={24} />
  //         </Button>
  //       </Box>
  //     )
  //   },
  // },
]
