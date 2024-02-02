import { Trans } from '@lingui/macro'
import { useSetChain } from '@web3-onboard/react'
import { useEffect, useRef } from 'react'

import useGlobalDialog from 'hooks/store/useGlobalDialog'
import { Button } from 'theme/Buttons'
import { Box, Type } from 'theme/base'
import { DEFAULT_CHAIN_ID, SUPPORTED_CHAIN_IDS, getChainMetadata } from 'utils/web3/chains'

const useChainRestrict = () => {
  const connectedChainRef = useRef<string>()
  const [{ connectedChain }, setChain] = useSetChain()
  const { dialog, showDialog, hideDialog } = useGlobalDialog()

  const defaultChain = getChainMetadata(DEFAULT_CHAIN_ID)

  useEffect(() => {
    if (!connectedChain) return
    if (connectedChainRef.current && connectedChainRef.current == connectedChain.id) return
    connectedChainRef.current = connectedChain.id
    if (!SUPPORTED_CHAIN_IDS.includes(parseInt(connectedChain.id, 16))) {
      showDialog({
        id: 'RESTRICT_CHAIN',
        title: (
          <Box p={3} pb={0}>
            <Trans>Unsupported Network</Trans>
          </Box>
        ),
        body: (
          <Box p={3} pt={0}>
            <Type.Caption display="block" mb={3}>
              <Trans>Please switch your wallet to {defaultChain.label}</Trans>
            </Type.Caption>
            <Button
              variant="primary"
              height={40}
              onClick={() =>
                setChain({
                  chainId: `0x${DEFAULT_CHAIN_ID.toString(16)}`,
                })
              }
            >
              Switch Network
            </Button>
          </Box>
        ),
      })
    } else {
      if (dialog?.id === 'RESTRICT_CHAIN') hideDialog()
    }
  }, [dialog, connectedChain])
}

export default useChainRestrict
