import { Trans } from '@lingui/macro'
import React, { useState } from 'react'

import NumberInput from 'components/NumberInput'
import { parseInputValue } from 'components/NumberInput/helpers'
import Num from 'entities/Num'
import { Button } from 'theme/Buttons'
import Modal from 'theme/Modal'
import { Box, Flex, Type } from 'theme/base'

const QUICK_SET_AMOUNT_OPTIONS = [10, 25, 50, 75, 100]

const ClosePositionModal = ({
  isOpen,
  setIsOpen,
  size,
  close,
}: {
  isOpen: boolean
  size: Num
  setIsOpen: (bool: boolean) => void
  close: (amount: number) => void
}) => {
  const [amount, setAmount] = useState<string | undefined>(size.str)
  const pAmount = parseInputValue(amount)
  return (
    <Modal isOpen={isOpen} onDismiss={() => setIsOpen(false)} title={<Trans>Enter close size</Trans>} hasClose>
      <Box p={4}>
        <Box mb={3} variant="cardPolygon" sx={{ bg: 'neutral6' }}>
          <Flex mb={3} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Type.Body color="neutral4">
              <Trans>Size</Trans>
            </Type.Body>
            <Flex sx={{ gap: '6px' }}>
              {QUICK_SET_AMOUNT_OPTIONS.map((option) => {
                return (
                  <Box
                    key={option.toString()}
                    variant="tag"
                    role="button"
                    onClick={() => setAmount(((size.num * option) / 100).toString())}
                    sx={{
                      fontSize: 13,
                      lineHeight: '20px',
                      color: 'neutral4',
                      '&:hover': { color: 'neutral2' },
                    }}
                  >
                    {option}%
                  </Box>
                )
              })}
            </Flex>
          </Flex>
          <Flex mb={2} sx={{ alignItems: 'center', gap: 3 }}>
            <NumberInput
              maxLength={11}
              value={amount}
              onValueChange={(e) => setAmount(e.target.value)}
              sx={{ flex: 1 }}
            />
            <Type.H5 sx={{ color: 'neutral4', fontWeight: 'normal' }}>USDB</Type.H5>
          </Flex>
        </Box>

        <Flex mt={4} justifyContent="space-between">
          <Button
            type="button"
            variant="primary"
            py={3}
            block
            onClick={() => {
              close(pAmount)
              setIsOpen(false)
            }}
          >
            <Trans>Confirm</Trans>
          </Button>
        </Flex>
      </Box>
    </Modal>
  )
}

export default ClosePositionModal
