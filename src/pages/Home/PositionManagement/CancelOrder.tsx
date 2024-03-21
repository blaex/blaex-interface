import { Contract } from '@ethersproject/contracts'
import React, { useState } from 'react'
import { UseMutationResult } from 'react-query'
import { toast } from 'react-toastify'

import ToastBody from 'components/@ui/ToastBody'
import { Order } from 'entities/Order'
import useRefetchQueries from 'hooks/helpers/ueRefetchQueries'
import { Button } from 'theme/Buttons'

const CancelOrder = ({
  order,
  contract,
  mutation,
}: {
  order: Order
  contract: Contract
  mutation: UseMutationResult
}) => {
  const refetchQueries = useRefetchQueries()
  const [submitting, setSubmitting] = useState(false)

  return (
    <>
      <Button
        variant="normal"
        size="xs"
        height={40}
        sx={{ fontWeight: 'normal' }}
        onClick={async () => {
          console.log('sfsfssf')
          setSubmitting(true)
          try {
            console.log('order.id', order.id)
            const gasLimit = await contract.estimateGas.cancelOrder(order.id)
            mutation.mutate(
              {
                method: 'cancelOrder',
                params: [order.id],
                gasLimit: gasLimit.mul(120).div(100),
              },
              {
                onSettled: (data) => {
                  setSubmitting(false)
                },
                onSuccess: () => {
                  refetchQueries(['getPendingOrders'])
                },
              }
            )
          } catch (err) {
            setSubmitting(false)
            toast.error(<ToastBody title="Error" message={err.message} />)
          }
        }}
        disabled={mutation.isLoading}
        isLoading={submitting}
      >
        {/* <Pencil size={24} /> */}
        Cancel
      </Button>
    </>
  )
}

export default CancelOrder
