import { Web3Provider } from '@ethersproject/providers'

import TokenWrapper from 'components/@ui/TokenWrapper'
import Num from 'entities/Num'
import { OnchainPosition, Position } from 'entities/Position'
import { usePerpsMarketContract } from 'hooks/web3/useContract'
import useContractQuery from 'hooks/web3/useContractQuery'
import useWeb3 from 'hooks/web3/useWeb3'
import { Button } from 'theme/Buttons'
import Table from 'theme/Table'
import { Box, Flex, Type } from 'theme/base'
import { formatNumber } from 'utils/helpers/format'

export default function OpenPositions() {
  const { walletAccount, walletProvider, publicProvider } = useWeb3()
  const PerpsMarketContract = usePerpsMarketContract({ provider: walletProvider ?? (publicProvider as Web3Provider) })

  const { data: openPositions } = useContractQuery<OnchainPosition[], any, Position[]>(
    PerpsMarketContract,
    'getOpenPositions',
    [walletAccount?.address],
    {
      select: (data: OnchainPosition[]) => {
        return data.map((op) => ({
          account: op.account,
          collateralInUsd: new Num(op.collateralInUsd),
          collateralToken: op.collateralToken,
          id: op.id.toNumber(),
          isClose: op.isClose,
          isLong: op.isLong,
          latestInteractionFunding: new Num(op.collateralInUsd),
          market: op.market.toNumber(),
          paidFees: new Num(op.paidFees),
          paidFunding: new Num(op.paidFunding),
          realisedPnl: new Num(op.realisedPnl),
          sizeInToken: new Num(op.sizeInToken),
          sizeInUsd: new Num(op.sizeInUsd),
        }))
      },
      refetchInterval: 3000,
      enabled: !!walletAccount?.address,
    }
  )
  console.log('openPositions', openPositions)
  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <Table data={openPositions} restrictHeight isLoading={false} columns={columns} />
    </Box>
  )
}

const columns: any = [
  {
    title: 'Market',
    dataIndex: undefined,
    key: undefined,
    style: { minWidth: '150px', textAlign: 'left' },
    render: (item: Position) => {
      return (
        <Flex alignItems="center" justifyContent="start" sx={{ gap: 2 }}>
          <TokenWrapper symbol="ETH" size={24} hasText={false} />
          <Flex flexDirection="column" sx={{ gap: 1 }}>
            <Type.Small display="block">ETH/USD</Type.Small>
            {item.isLong ? (
              <Type.Small color="system2">Long</Type.Small>
            ) : (
              <Type.Small color="system1">Short</Type.Small>
            )}
          </Flex>
        </Flex>
      )
    },
  },
  {
    title: 'Market Price',
    dataIndex: undefined,
    key: undefined,
    style: { minWidth: '100px', textAlign: 'right' },
    render: (item: any) => {
      return <Type.Small>${formatNumber(0)}</Type.Small>
    },
  },
  {
    title: 'Collateral',
    dataIndex: undefined,
    key: undefined,
    style: { minWidth: '100px', textAlign: 'right' },
    render: (item: Position) => {
      return <Type.Small>${formatNumber(item.collateralInUsd.num)}</Type.Small>
    },
  },
  {
    title: 'Size',
    dataIndex: undefined,
    key: undefined,
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
    dataIndex: undefined,
    key: undefined,
    style: { minWidth: '130px', textAlign: 'right' },
    render: (item: any) => {
      return <Type.Small>${formatNumber(item.sizeInUsd.num / item.sizeInToken.num, 2, 2)}</Type.Small>
    },
  },
  {
    title: 'Est.Liq.Price',
    dataIndex: undefined,
    key: undefined,
    style: { minWidth: '130px', textAlign: 'right' },
    render: (item: any) => {
      return <Type.Small>${formatNumber(0)}</Type.Small>
    },
  },
  {
    title: 'PnL',
    dataIndex: undefined,
    key: undefined,
    style: { minWidth: '100px', textAlign: 'right' },
    render: (item: Position) => {
      const pnl = 1.2424
      return (
        <Box>
          <Type.Small color={pnl >= 0 ? 'primary1' : 'red1'} display="block">
            {pnl > 0 ? '+' : ''}${formatNumber(pnl, 2, 2)}
          </Type.Small>
        </Box>
      )
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
    dataIndex: undefined,
    key: undefined,
    style: { minWidth: '100px', textAlign: 'right' },
    render: (item: any) => {
      return (
        <Box pr={3}>
          <Button variant="normal" size="xs" height={40} sx={{ fontWeight: 'normal' }}>
            {/* <Pencil size={24} /> */}
            Close
          </Button>
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
