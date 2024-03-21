import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'
import { UseMutationResult } from 'react-query'

import TokenWrapper from 'components/@ui/TokenWrapper'
import Num from 'entities/Num'
import { Order } from 'entities/Order'
import { usePerpsMarketContract } from 'hooks/web3/useContract'
import useContractMutation from 'hooks/web3/useContractMutation'
import useContractQuery from 'hooks/web3/useContractQuery'
import useWeb3 from 'hooks/web3/useWeb3'
import Table from 'theme/Table'
import { Box, Flex, Type } from 'theme/base'
import { formatDate, formatNumber } from 'utils/helpers/format'

import CancelOrder from './CancelOrder'

export default function PendingOrders() {
  const { walletAccount, walletProvider, publicProvider } = useWeb3()
  const PerpsMarketContract = usePerpsMarketContract({ provider: walletProvider ?? (publicProvider as Web3Provider) })

  const { data: pendingOrders } = useContractQuery<any[][], any, Order[]>(
    PerpsMarketContract,
    'getPendingOrders',
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
            isLong: op[3],
            isIncrease: op[4],
            sizeDeltaUsd: op[5] ? new Num(op[5]) : defaultValue,
            collateralDeltaUsd: op[6] ? new Num(op[6]) : defaultValue,
            triggerPrice: op[7] ? new Num(op[7]) : defaultValue,
            acceptablePrice: op[8] ? new Num(op[8]) : defaultValue,
            executionPrice: op[9] ? new Num(op[9]) : defaultValue,
            orderFees: op[10] ? new Num(op[10]) : defaultValue,
            executionFees: op[11] ? new Num(op[11]) : defaultValue,
            submissionTime: new Date(op[12].toNumber() * 1000),
            isExecuted: op[13],
            isCanceled: op[14],
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
      <Table
        data={pendingOrders}
        restrictHeight
        isLoading={false}
        columns={columns}
        externalSource={{ contract: PerpsMarketContract, mutation }}
      />
    </Box>
  )
}

const columns: any = [
  {
    title: 'Market',
    dataIndex: 'market',
    key: 'market',
    style: { minWidth: '150px', textAlign: 'left' },
    render: (item: Order) => {
      const leverage = `${formatNumber(item.sizeDeltaUsd.num / item.collateralDeltaUsd.num)}x`
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
    title: 'Submission Time',
    dataIndex: 'submissionTime',
    key: 'submissionTime',
    style: { minWidth: '180px', textAlign: 'left' },
    render: (item: Order) => {
      return <Type.Small>{formatDate(item.submissionTime.toString())}</Type.Small>
    },
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    style: { minWidth: '100px', textAlign: 'left' },
    render: (item: Order) => {
      return (
        <Type.Small>
          {item.triggerPrice.num === 0 ? 'Market' : 'Limit'} {item.isIncrease ? ' Increase' : ' Decrease'}
        </Type.Small>
      )
    },
  },

  {
    title: 'Collateral',
    dataIndex: 'collateral',
    key: 'collateral',
    style: { minWidth: '100px', textAlign: 'right' },
    render: (item: Order) => {
      return <Type.Small>${formatNumber(item.collateralDeltaUsd.num, 2, 2)}</Type.Small>
    },
  },
  {
    title: 'Size',
    dataIndex: 'size',
    key: 'size',
    style: { minWidth: '180px', textAlign: 'right' },
    render: (item: Order) => {
      return <Type.Small display="block">${formatNumber(item.sizeDeltaUsd.num, 2, 2)}</Type.Small>
    },
  },
  {
    title: 'Order Fees',
    dataIndex: 'orderFees',
    key: 'orderFees',
    style: { minWidth: '180px', textAlign: 'right' },
    render: (item: Order) => {
      return <Type.Small display="block">${formatNumber(item.orderFees.num, 2, 2)}</Type.Small>
    },
  },
  {
    title: 'Execution Fees',
    dataIndex: 'executionFees',
    key: 'executionFees',
    style: { minWidth: '180px', textAlign: 'right' },
    render: (item: Order) => {
      return <Type.Small display="block">${formatNumber(item.executionFees.num, 2, 2)}</Type.Small>
    },
  },

  {
    title: '',
    dataIndex: 'action',
    key: 'action',
    style: { minWidth: '100px', textAlign: 'right' },
    render: (
      item: Order,
      index: number,
      { mutation, contract }: { mutation: UseMutationResult; contract: Contract }
    ) => {
      return (
        <Box pr={3} key={`order-${item.id}`}>
          <CancelOrder order={item} mutation={mutation} contract={contract} />
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
