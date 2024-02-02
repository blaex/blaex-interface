import { ChangeEvent, RefObject } from 'react'

import Input from 'theme/Input'

function escapeSpecialRegExpChars(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`)

type Props = {
  value?: string | number
  inputRef?: RefObject<HTMLInputElement>
  onValueChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onFocus?: () => void
  onBlur?: () => void
  className?: string
  placeholder?: string
  sx?: any
  maxLength?: number
}

function NumberInput({
  value = '',
  inputRef,
  onValueChange,
  onFocus,
  onBlur,
  className,
  placeholder,
  sx,
  maxLength,
}: Props) {
  function onChange(e: ChangeEvent<HTMLInputElement>) {
    if (!onValueChange) return
    // Replace comma with dot
    let newValue = e.target.value.replace(/,/g, '.')
    if (newValue === '.') {
      newValue = '0.'
    }

    if (newValue === '' || inputRegex.test(escapeSpecialRegExpChars(newValue))) {
      e.target.value = newValue
      onValueChange(e)
    }
  }
  return (
    <Input
      type="text"
      inputMode="decimal"
      placeholder={placeholder || '0.0'}
      className={className}
      value={value}
      ref={inputRef}
      onChange={onChange}
      autoComplete="off"
      autoCorrect="off"
      minLength={1}
      maxLength={maxLength || 15}
      spellCheck="false"
      onFocus={onFocus}
      onBlur={onBlur}
      sx={{
        border: 'none',
        bg: 'transparent',
        p: 0,
        input: { fontSize: 32, lineHeight: '40px', width: '100%' },
        '&:focus-within:not([disabled])': {
          bg: 'neutral6',
        },
        '&:hover:not([disabled]),&:focus:not([disabled])': {
          bg: 'neutral6',
        },
        'input::placeholder': { color: 'neutral5' },
        ...(sx || {}),
      }}
    />
  )
}

export default NumberInput
