import { parseEther } from '@ethersproject/units'
import React, { useState } from 'react'
import { UseMutationResult } from 'react-query'

import { Position } from 'entities/Position'
import useRefetchQueries from 'hooks/helpers/ueRefetchQueries'
import useUsdPrices from 'hooks/store/useUsdPrices'
import { Button } from 'theme/Buttons'
import { OrderType } from 'utils/config/constants'
import { CONTRACT_KEYS } from 'utils/config/keys'
import { DEFAULT_CHAIN_ID } from 'utils/web3/chains'
import { CONTRACT_ADDRESSES } from 'utils/web3/contracts'
import { calculateAcceptablePrice } from 'utils/web3/trades'

import ClosePositionModal from './ClosePositionModal'

const ClosePosition = ({ position, mutation }: { position: Position; mutation: UseMutationResult }) => {
  const refetchQueries = useRefetchQueries()
  const [isOpen, setIsOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const { prices } = useUsdPrices()

  const priceBn = prices.ETHUSD ? parseEther(prices.ETHUSD.toString()) : undefined
  return (
    <>
      <Button
        variant="normal"
        size="xs"
        height={40}
        sx={{ fontWeight: 'normal' }}
        onClick={() => setIsOpen(true)}
        disabled={mutation.isLoading}
        isLoading={submitting}
      >
        {/* <Pencil size={24} /> */}
        Close
      </Button>
      <ClosePositionModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        close={() => {
          if (!priceBn) return
          setSubmitting(true)
          mutation.mutate(
            {
              method: 'createOrder',
              params: [
                {
                  market: 1,
                  collateralToken: CONTRACT_ADDRESSES[DEFAULT_CHAIN_ID][CONTRACT_KEYS.USDB],
                  sizeDeltaUsd: position.sizeInUsd.bn,
                  collateralDeltaUsd: position.collateralInUsd.bn,
                  triggerPrice: priceBn,
                  acceptablePrice: calculateAcceptablePrice(priceBn, position.isLong),
                  orderType: OrderType.MarketDecrease,
                  isLong: position.isLong,
                },
              ],
              gasLimit: 1000000,
            },
            {
              onSettled: (data) => {
                setSubmitting(false)
              },
              onSuccess: () => {
                refetchQueries(['getOpenPositions'])
              },
            }
          )
        }}
      />
    </>
  )
}

export default ClosePosition
