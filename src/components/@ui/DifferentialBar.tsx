import { Box, Flex } from 'theme/base'

export function DifferentialBar({
  sourceRate,
  targetRate,
  height = 8,
}: {
  sourceRate: number // percentage
  targetRate: number // percentage
  height?: number
}) {
  return (
    <Flex width="100%" height={height}>
      <Box
        width={`calc(${sourceRate}% - 6px)`}
        height="100%"
        bg="system2"
        sx={{ clipPath: `polygon(0 0, 100% 0, 100% 100%, ${height}px 100%, 0 0)` }}
      ></Box>
      <Box width="12px" sx={{ position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            display: 'inline-block',
            borderStyle: 'solid',
            borderWidth: '4px',
            borderTopColor: 'transparent',
            borderLeftColor: 'system2',
            borderBottomColor: 'system2',
            borderRightColor: 'transparent',
          }}
          width="0"
          height="0"
        ></Box>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            display: 'inline-block',
            borderStyle: 'solid',
            borderWidth: '4px',
            borderTopColor: 'system1',
            borderLeftColor: 'transparent',
            borderBottomColor: 'transparent',
            borderRightColor: 'system1',
          }}
          width="0"
          height="0"
        ></Box>
      </Box>
      <Box
        width={`calc(${targetRate}% - 6px)`}
        height="100%"
        bg="system1"
        sx={{ clipPath: `polygon(0 0, calc(100% - ${height}px) 0, 100% 100%, 0 100%, 0 0)` }}
      ></Box>
    </Flex>
  )
}
