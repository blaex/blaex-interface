import { Trans } from '@lingui/macro'
import { Wallet } from '@phosphor-icons/react'

import { useAuthContext } from 'hooks/web3/useAuth'
import { Button, ButtonProps } from 'theme/Buttons'
import { Box } from 'theme/base'

const ConnectButton = ({ onConnect, sx, ...props }: ButtonProps & { onConnect?: () => void }) => {
  const { connect, loading, isAuthenticated } = useAuthContext()

  const handleSubmit = () => {
    connect({})
    onConnect && onConnect()
  }

  return (
    <Button
      variant="ghostPrimary"
      onClick={handleSubmit}
      isLoading={loading || isAuthenticated == null}
      disabled={loading || isAuthenticated == null}
      sx={{ display: 'flex', alignItems: 'center', gap: 2, ...(sx || {}) }}
      {...props}
    >
      <Wallet size={24} />
      <Box as="span">
        <Trans>Connect Wallet</Trans>
      </Box>
    </Button>
  )
}

export default ConnectButton
