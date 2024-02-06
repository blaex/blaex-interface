import React from 'react'

import { Flex, Image, Type } from 'theme/base'
import { parseMarketImageSrc } from 'utils/helpers/transform'

function TokenWrapper({ symbol, size, hasText = true }: { symbol: string; size?: number; hasText?: boolean }) {
  return (
    <Flex sx={{ gap: 2 }}>
      <Image src={parseMarketImageSrc(symbol)} width={size ?? 32} height={size ?? 32} />
      {hasText && <Type.H5 sx={{ fontWeight: 'normal' }}>{symbol}</Type.H5>}
    </Flex>
  )
}

export default TokenWrapper
