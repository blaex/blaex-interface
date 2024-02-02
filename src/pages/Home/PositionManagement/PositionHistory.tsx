import { Export, Pencil } from '@phosphor-icons/react'

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
            <Type.Caption display="block">ETH / USD</Type.Caption>
            <Type.Caption>Short</Type.Caption>
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
      return <Type.Caption>${formatNumber(123123)}</Type.Caption>
    },
  },
  {
    title: 'Collateral',
    dataIndex: undefined,
    key: undefined,
    style: { minWidth: '100px', textAlign: 'right' },
    render: (item: any) => {
      return <Type.Caption>${formatNumber(123123)}</Type.Caption>
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
            <Type.Caption display="block">${formatNumber(123123)}</Type.Caption>
            <Type.Caption>{formatNumber(123123)}ETH</Type.Caption>
          </Box>
          <Button variant="normal" p={2} height={40}>
            <Pencil size={24} />
          </Button>
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
      return <Type.Caption>${formatNumber(123123)}</Type.Caption>
    },
  },
  {
    title: 'Est.Liq.Price',
    dataIndex: undefined,
    key: undefined,
    style: { minWidth: '130px', textAlign: 'right' },
    render: (item: any) => {
      return <Type.Caption>${formatNumber(123123)}</Type.Caption>
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
          <Type.Caption display="block">${formatNumber(123123)}</Type.Caption>
          <Type.Caption>${formatNumber(123123)}</Type.Caption>
        </Box>
      )
    },
  },
  {
    title: 'TP / SL',
    dataIndex: undefined,
    key: undefined,
    style: { minWidth: '180px', textAlign: 'right' },
    render: (item: any) => {
      return (
        <Flex sx={{ width: '100%', justifyContent: 'end', gap: 3 }}>
          <Box>
            <Type.Caption display="block">${formatNumber(123123)}</Type.Caption>
            <Type.Caption>{formatNumber(123123)}ETH</Type.Caption>
          </Box>
          <Button variant="normal" p={2} height={40}>
            <Pencil size={24} />
          </Button>
        </Flex>
      )
    },
  },
  {
    title: '',
    dataIndex: undefined,
    key: undefined,
    style: { minWidth: '100px', textAlign: 'right' },
    render: (item: any) => {
      return (
        <Button variant="normal" height={40} sx={{ fontWeight: 'normal' }}>
          {/* <Pencil size={24} /> */}
          Close
        </Button>
      )
    },
  },
  {
    title: '',
    dataIndex: undefined,
    key: undefined,
    style: { minWidth: '100px', textAlign: 'right' },
    render: (item: any) => {
      return (
        <Box pr={3}>
          <Button variant="normal" p={2} height={40}>
            <Export size={24} />
          </Button>
        </Box>
      )
    },
  },
]
