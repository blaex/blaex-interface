export function parseInputValue(value: number | string | undefined) {
  try {
    const pValue = Number(value || '0')
    if (isNaN(pValue)) return 0
    return pValue
  } catch {
    return 0
  }
}
