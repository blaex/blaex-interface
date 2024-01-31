import { Box } from 'theme/base'

const Divider = ({ color = 'stroke', isDashed = false, ...props }: { color?: string; isDashed?: boolean } & any) => {
  return (
    <Box
      {...props}
      sx={{
        height: '1px',
        bg: isDashed ? 'transparent' : color,
        borderTop: isDashed ? '1px dashed' : undefined,
        borderColor: isDashed ? color : undefined,
        ...(props?.sx || {}),
      }}
    />
  )
}

export default Divider
