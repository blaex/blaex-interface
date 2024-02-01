export function parseInputValue(value: string | undefined) {
  const pValue = parseFloat(value || '0')
  if (isNaN(pValue)) return 0
  return pValue
}
