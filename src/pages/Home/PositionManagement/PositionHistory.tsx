import { useQuery } from 'react-query'

import { getPositions } from 'apis/tradeApis'
import { SignedText } from 'components/@ui/DecoratedText/SignedText'
import TokenWrapper from 'components/@ui/TokenWrapper'
import { OffchainPosition } from 'entities/Position'
import { useAuthContext } from 'hooks/web3/useAuth'
import Table from 'theme/Table'
import { Box, Flex, Type } from 'theme/base'
import { formatNumber, formatRelativeDate } from 'utils/helpers/format'
import { isAddress } from 'utils/web3/contracts'

export default function PositionHistory() {
  const { account } = useAuthContext()
  const { data } = useQuery(
    ['positions', account?.address],
    () => getPositions(account?.address ? isAddress(account.address) : undefined),
    {
      enabled: !!account?.address,
    }
  )

  console.log('data', data)
  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <Table data={data} restrictHeight isLoading={false} columns={columns} />
    </Box>
  )
}

const columns: any = [
  {
    title: 'Market',
    dataIndex: 'market',
    key: 'market',
    style: { minWidth: '150px', textAlign: 'left' },
    render: (item: OffchainPosition) => {
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
    title: 'Time',
    dataIndex: 'blockTime',
    key: 'blockTime',
    style: { minWidth: '130px', textAlign: 'left' },
    render: (item: OffchainPosition) => {
      return <Type.Small>{formatRelativeDate(item.blockTime)}</Type.Small>
    },
  },
  {
    title: 'Last Collateral',
    dataIndex: 'lastCollateralInUsd',
    key: 'lastCollateralInUsd',
    style: { minWidth: '100px', textAlign: 'right' },
    render: (item: OffchainPosition) => {
      return <Type.Small>${formatNumber(item.lastCollateralInUsd, 2, 2)}</Type.Small>
    },
  },
  {
    title: 'Last Size',
    dataIndex: 'lastSizeInToken',
    key: 'lastSizeInToken',
    style: { minWidth: '180px', textAlign: 'right' },
    render: (item: OffchainPosition) => {
      return (
        <Flex sx={{ width: '100%', justifyContent: 'end', gap: 3 }}>
          <Flex flexDirection="column" sx={{ gap: 1 }}>
            <Type.Small display="block">${formatNumber(item.lastSizeInUsd, 2, 2)}</Type.Small>
            <Type.Small color="neutral5">{formatNumber(item.lastSizeInToken, 4, 4)}ETH</Type.Small>
          </Flex>
          {/* <Button variant="normal" p={2} height={40}>
            <Pencil size={20} />
          </Button> */}
        </Flex>
      )
    },
  },
  {
    title: 'Last Entry Price',
    dataIndex: 'lastEntryPrice',
    key: 'lastEntryPrice',
    style: { minWidth: '130px', textAlign: 'right' },
    render: (item: OffchainPosition) => {
      return <Type.Small>${formatNumber(item.lastSizeInUsd / item.lastCollateralInUsd, 2, 2)}</Type.Small>
    },
  },
  {
    title: 'Realised PnL',
    dataIndex: 'realisedPnl',
    key: 'realisedPnl',
    style: { minWidth: '100px', textAlign: 'right' },
    render: (item: OffchainPosition) => {
      return (
        <Type.Small>
          <SignedText
            fontInherit={true}
            value={item.realisedPnl}
            minDigit={2}
            maxDigit={2}
            showPlus={true}
            prefix="$"
            sx={{ textAlign: 'right', width: '100%' }}
          />
        </Type.Small>
      )
    },
  },
  {
    title: 'Paid Funding',
    dataIndex: 'paidFunding',
    key: 'paidFunding',
    style: { minWidth: '100px', textAlign: 'right' },
    render: (item: OffchainPosition) => {
      return (
        <Type.Small>
          <SignedText
            fontInherit={true}
            value={item.paidFunding}
            minDigit={2}
            maxDigit={2}
            showPlus={true}
            prefix="$"
            sx={{ textAlign: 'right', width: '100%' }}
          />
        </Type.Small>
      )
    },
  },
  {
    title: 'Paid Fees',
    dataIndex: 'paidFees',
    key: undefined,
    style: { minWidth: '100px', textAlign: 'right', pr: 2 },
    render: (item: OffchainPosition) => {
      return (
        <Type.Small>
          <SignedText
            neg={true}
            fontInherit={true}
            value={item.paidFees}
            minDigit={2}
            maxDigit={2}
            prefix="$"
            sx={{ textAlign: 'right', width: '100%' }}
          />
        </Type.Small>
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
