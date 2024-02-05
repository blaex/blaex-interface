import { Button } from 'theme/Buttons'
import Table from 'theme/Table'
import { Box, Flex, Type } from 'theme/base'
import { formatNumber } from 'utils/helpers/format'

export default function PositionHistory() {
  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <Table data={[{}, {}, {}, {}, {}, {}]} restrictHeight isLoading={false} columns={columns} />
    </Box>
  )
}

const columns: any = [
  {
    title: 'Market',
    dataIndex: undefined,
    key: undefined,
    style: { minWidth: '150px', textAlign: 'left' },
    render: (item: any) => {
      return (
        <Flex alignItems="center" justifyContent="start" sx={{ gap: 2 }}>
          <Box width={24} height={24} bg="neutral1" />
          <Box>
            <Type.Small display="block">ETH / USD</Type.Small>
            <Type.Small>Short</Type.Small>
          </Box>
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
      return <Type.Small>${formatNumber(123123)}</Type.Small>
    },
  },
  {
    title: 'Collateral',
    dataIndex: undefined,
    key: undefined,
    style: { minWidth: '100px', textAlign: 'right' },
    render: (item: any) => {
      return <Type.Small>${formatNumber(123123)}</Type.Small>
    },
  },
  {
    title: 'Size',
    dataIndex: undefined,
    key: undefined,
    style: { minWidth: '180px', textAlign: 'right' },
    render: (item: any) => {
      return (
        <Flex sx={{ width: '100%', justifyContent: 'end', gap: 3 }}>
          <Box>
            <Type.Small display="block">${formatNumber(123123)}</Type.Small>
            <Type.Small>{formatNumber(123123)}ETH</Type.Small>
          </Box>
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
      return <Type.Small>${formatNumber(123123)}</Type.Small>
    },
  },
  {
    title: 'Est.Liq.Price',
    dataIndex: undefined,
    key: undefined,
    style: { minWidth: '130px', textAlign: 'right' },
    render: (item: any) => {
      return <Type.Small>${formatNumber(123123)}</Type.Small>
    },
  },
  {
    title: 'PnL',
    dataIndex: undefined,
    key: undefined,
    style: { minWidth: '100px', textAlign: 'right' },
    render: (item: any) => {
      return (
        <Box>
          <Type.Small display="block">${formatNumber(123123)}</Type.Small>
          <Type.Small>${formatNumber(123123)}</Type.Small>
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
