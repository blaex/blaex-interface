import { Trans } from '@lingui/macro'
import React from 'react'

import { Button } from 'theme/Buttons'
import Modal from 'theme/Modal'
import { Box, Flex, Type } from 'theme/base'

const ClosePositionModal = ({
  isOpen,
  setIsOpen,
  close,
}: {
  isOpen: boolean
  setIsOpen: (bool: boolean) => void
  close: () => void
}) => {
  return (
    <Modal isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
      <Box p={4}>
        <Flex justifyContent="center" flexDirection="column">
          <Box textAlign="center">
            <Type.BodyBold>
              <Trans>Do you want to close this position?</Trans>
            </Type.BodyBold>
          </Box>
        </Flex>

        <Flex mt={4} justifyContent="space-between">
          <Button variant="normal" px={4} width="49%" type="button" onClick={() => setIsOpen(false)}>
            <Trans>Back</Trans>
          </Button>
          <Button
            type="button"
            variant="primary"
            px={4}
            width="49%"
            onClick={() => {
              close()
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
