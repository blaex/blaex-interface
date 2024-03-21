import { ArrowSquareOut } from '@phosphor-icons/react'
import { useQuery } from 'react-query'

import { getOrders } from 'apis/tradeApis'
import { SignedText } from 'components/@ui/DecoratedText/SignedText'
import TokenWrapper from 'components/@ui/TokenWrapper'
import { OffchainOrder } from 'entities/Order'
import { useAuthContext } from 'hooks/web3/useAuth'
import useChain from 'hooks/web3/useChain'
import Table from 'theme/Table'
import { Box, Flex, Type } from 'theme/base'
import { addressShorten, formatNumber, formatRelativeDate } from 'utils/helpers/format'
import { isAddress } from 'utils/web3/contracts'
import { Chain } from 'utils/web3/types'

export default function OrderHistory() {
  const { chain } = useChain()
  const { account } = useAuthContext()
  const { data } = useQuery(
    ['orders', account?.address],
    () => getOrders(account?.address ? isAddress(account.address) : undefined),
    {
      enabled: !!account?.address,
    }
  )

  console.log('data', data)
  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <Table data={data} restrictHeight isLoading={false} columns={columns} externalSource={chain} />
    </Box>
  )
}

const columns: any = [
  {
    title: 'Market',
    dataIndex: 'market',
    key: 'market',
    style: { minWidth: '120px', textAlign: 'left' },
    render: (item: OffchainOrder) => {
      const leverage = `${formatNumber(item.sizeDeltaUsd / item.collateralDeltaUsd)}x`
      return (
        <Flex alignItems="center" justifyContent="start" sx={{ gap: 2 }}>
          <TokenWrapper symbol="ETH" size={24} hasText={false} />
          <Flex flexDirection="column" sx={{ gap: 1 }}>
            <Type.Small display="block">ETH/USD</Type.Small>
            {item.isLong ? (
              <Type.Small color="system2">Long {leverage}</Type.Small>
            ) : (
              <Type.Small color="system1">Short {leverage}</Type.Small>
            )}
          </Flex>
        </Flex>
      )
    },
  },
  {
    title: 'Execution Time',
    dataIndex: 'executionTime',
    key: 'executionTime',
    style: { minWidth: '180px', textAlign: 'left' },
    render: (item: OffchainOrder) => {
      return <Type.Small>{formatRelativeDate(item.blockTime)}</Type.Small>
    },
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    style: { minWidth: '100px', textAlign: 'left' },
    render: (item: OffchainOrder) => {
      return (
        <Type.Small>
          {item.triggerPrice === 0 ? 'Market' : 'Limit'} {item.isIncrease ? ' Increase' : ' Decrease'}
        </Type.Small>
      )
    },
  },
  {
    title: 'Collateral',
    dataIndex: 'collateralInUsd',
    key: 'collateralInUsd',
    style: { minWidth: '100px', textAlign: 'right' },
    render: (item: OffchainOrder) => {
      return <Type.Small>${formatNumber(item.collateralDeltaUsd, 2, 2)}</Type.Small>
    },
  },
  {
    title: 'Size',
    dataIndex: 'sizeInToken',
    key: 'sizeInToken',
    style: { minWidth: '150px', textAlign: 'right' },
    render: (item: OffchainOrder) => {
      return (
        <Flex sx={{ width: '100%', justifyContent: 'end', gap: 3 }}>
          <Flex flexDirection="column" sx={{ gap: 1 }}>
            <Type.Small display="block">${formatNumber(item.sizeDeltaUsd, 2, 2)}</Type.Small>
            {!!item.executionPrice && (
              <Type.Small color="neutral5">{formatNumber(item.sizeDeltaUsd / item.executionPrice, 4, 4)}ETH</Type.Small>
            )}
          </Flex>
          {/* <Button variant="normal" p={2} height={40}>
            <Pencil size={20} />
          </Button> */}
        </Flex>
      )
    },
  },
  {
    title: 'Execution Price',
    dataIndex: 'executionPrice',
    key: 'executionPrice',
    style: { minWidth: '130px', textAlign: 'right' },
    render: (item: OffchainOrder) => {
      return <Type.Small>${formatNumber(item.executionPrice, 2, 2)}</Type.Small>
    },
  },
  {
    title: 'Paid Fees',
    dataIndex: 'paidFees',
    key: undefined,
    style: { minWidth: '100px', textAlign: 'right', pr: 3 },
    render: (item: OffchainOrder) => {
      return (
        <Type.Small>
          <SignedText
            neg={true}
            fontInherit={true}
            value={item.orderFees}
            minDigit={2}
            maxDigit={2}
            prefix="$"
            sx={{ textAlign: 'right', width: '100%' }}
          />
        </Type.Small>
      )
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    style: { minWidth: '100px', textAlign: 'right', pr: 3 },
    render: (item: OffchainOrder) => {
      return <Type.Small>{item.status}</Type.Small>
    },
  },
  {
    title: 'Transaction',
    dataIndex: 'transaction',
    key: 'transaction',
    style: { minWidth: '120px', textAlign: 'left', pl: 3 },
    render: (item: OffchainOrder, index: number, chain: Chain) => {
      return (
        <a href={`${chain.blockExplorerUrl}/tx/${item.txHash}`} target="_blank" rel="noreferrer">
          <Flex alignItems="center" sx={{ gap: 1 }}>
            <Type.Small lineHeight="12px" sx={{ position: 'relative', top: '1.5px' }}>
              {addressShorten(item.txHash, 4, 4)}
            </Type.Small>
            <ArrowSquareOut size={14} />
          </Flex>
        </a>
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
