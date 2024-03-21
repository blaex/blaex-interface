import { Contract } from '@ethersproject/contracts'
import { parseEther } from '@ethersproject/units'
import React, { useState } from 'react'
import { UseMutationResult } from 'react-query'
import { toast } from 'react-toastify'

import ToastBody from 'components/@ui/ToastBody'
import { Position } from 'entities/Position'
import useRefetchQueries from 'hooks/helpers/ueRefetchQueries'
import useUsdPrices from 'hooks/store/useUsdPrices'
import { Button } from 'theme/Buttons'
import { calculateAcceptablePrice } from 'utils/web3/trades'

import ClosePositionModal from './ClosePositionModal'

const ClosePosition = ({
  position,
  contract,
  mutation,
}: {
  position: Position
  contract: Contract
  mutation: UseMutationResult
}) => {
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
        size={position.sizeInUsd}
        setIsOpen={setIsOpen}
        close={async (amount: number) => {
          if (!priceBn) return
          const amountBn = parseEther(amount.toString())
          setSubmitting(true)

          try {
            const payload = {
              market: 1,
              sizeDeltaUsd: amountBn,
              collateralDeltaUsd: amountBn.mul(position.collateralInUsd.bn).div(position.sizeInUsd.bn),
              triggerPrice: 0,
              acceptablePrice: calculateAcceptablePrice(priceBn, !position.isLong),
              isLong: position.isLong,
              isIncrease: false,
            }
            const gasLimit = await contract.estimateGas.createOrder(payload)
            mutation.mutate(
              {
                method: 'createOrder',
                params: [payload],
                gasLimit: gasLimit.mul(120).div(100),
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
          } catch (err) {
            setSubmitting(false)
            toast.error(<ToastBody title="Error" message={err.message} />)
          }
        }}
      />
    </>
  )
}

export default ClosePosition
