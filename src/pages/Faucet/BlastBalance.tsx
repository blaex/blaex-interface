import { formatEther } from '@ethersproject/units'
import { CoinVertical } from '@phosphor-icons/react'

import useBalancesStore from 'hooks/store/useBalancesManagement'
import { Box, Flex, IconBox, Type } from 'theme/base'
import { generateClipPath } from 'utils/helpers/css'
import { formatNumber } from 'utils/helpers/format'

const BlastBalance = () => {
  const { USDB } = useBalancesStore((state) => state.balances)
  return (
    <Flex sx={{ alignItems: 'center', justifyContent: 'center', gap: 2 }}>
      <IconBox
        sx={{
          flexShrink: 0,
          p: 2,
          clipPath: generateClipPath({ diffX: 16, diffY: 8 }),
          color: 'primary1',
          bg: '#B7ED1C1A',
        }}
        icon={<CoinVertical size={24} />}
      />
      <Type.BodyBold>
        Your Blast L2 balance:{' '}
        <Box as="span" color="primary1">
          {USDB ? formatNumber(formatEther(USDB)) : '--'} USDB
        </Box>
      </Type.BodyBold>
    </Flex>
  )
}

export default BlastBalance
