import { Trans } from '@lingui/macro'
import { ReactNode } from 'react'

export const ORDER_TYPE_TRANS: { [key: string]: ReactNode } = {
  INCREASE: <Trans>Increase</Trans>,
  DECREASE: <Trans>Decrease</Trans>,
}
