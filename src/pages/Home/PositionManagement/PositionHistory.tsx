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
            <Type.Body display="block">ETH / USD</Type.Body>
            <Type.Body>Short</Type.Body>
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
      return <Type.Body>${formatNumber(123123)}</Type.Body>
    },
  },
  {
    title: 'Collateral',
    dataIndex: undefined,
    key: undefined,
    style: { minWidth: '100px', textAlign: 'right' },
    render: (item: any) => {
      return <Type.Body>${formatNumber(123123)}</Type.Body>
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
            <Type.Body display="block">${formatNumber(123123)}</Type.Body>
            <Type.Body>{formatNumber(123123)}ETH</Type.Body>
          </Box>
          <Button variant="normal">
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
      return <Type.Body>${formatNumber(123123)}</Type.Body>
    },
  },
  {
    title: 'Est.Liq.Price',
    dataIndex: undefined,
    key: undefined,
    style: { minWidth: '130px', textAlign: 'right' },
    render: (item: any) => {
      return <Type.Body>${formatNumber(123123)}</Type.Body>
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
          <Type.Body display="block">${formatNumber(123123)}</Type.Body>
          <Type.Body>${formatNumber(123123)}</Type.Body>
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
            <Type.Body display="block">${formatNumber(123123)}</Type.Body>
            <Type.Body>{formatNumber(123123)}ETH</Type.Body>
          </Box>
          <Button variant="normal">
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
        <Button variant="normal">
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
          <Button variant="normal">
            <Export size={24} />
          </Button>
        </Box>
      )
    },
  },
]
