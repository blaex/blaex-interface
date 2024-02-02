import { SystemStyleObject } from '@styled-system/css'
import { FlattenSimpleInterpolation, css } from 'styled-components/macro'
import { GridProps, TLengthStyledSystem, Theme } from 'styled-system'
import { v5 as uuidV5 } from 'uuid'

export const transition = (
  target: string | undefined = 'all',
  effect: string | undefined = 'ease-in-out',
  time: string | undefined = '0.25s'
): FlattenSimpleInterpolation => {
  return css`
    transition: ${target} ${effect} ${time};
  `
}

export const ellipsisLineClamp = (lineClamp = 2): FlattenSimpleInterpolation => {
  return css`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${lineClamp};
    -webkit-box-orient: vertical;
  `
}

export function overflowEllipsis() {
  const styles: (SystemStyleObject & GridProps<Required<Theme<TLengthStyledSystem>>>) | undefined = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }
  return styles
}

export function getColorFromText(stringInput: string) {
  const id = uuidV5(stringInput, uuidV5.URL).replaceAll('-', '')
  const stringUniqueHash = [...id].reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 16) - acc)
  }, 0)
  return `hsl(${stringUniqueHash % 360}, 100%, 68%)`
}

export function hideScrollbar() {
  return {
    /* Hide scrollbar for Chrome, Safari and Opera */
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    /* Hide scrollbar for IE, Edge and Firefox */
    '&': {
      '-ms-overflow-style': 'none' /* IE and Edge */,
      'scrollbar-width': 'none' /* Firefox */,
    },
  }
}

export function generateClipPath(args?: { type?: '1tr' | '2' | '2r'; diffX?: number; diffY?: number }) {
  const { type = '2', diffX = 32, diffY = 16 } = args ?? {}
  switch (type) {
    case '1tr':
      return `polygon(0 0, calc(100% - ${diffX}px) 0, 100% ${diffY}px, 100% 100%, 0 100%, 0 0)`
    case '2r':
      return `polygon(${diffX}px 0, 100% 0, 100% ${diffY}px, 100% calc(100% - ${diffY}px), calc(100% - ${diffX}px) 100%, 0 100%, 0 ${diffY}px, ${diffX}px 0)`
    default:
      return `polygon(0 0, calc(100% - ${diffX}px) 0, 100% ${diffY}px, 100% calc(100% - ${diffY}px), 100% 100%, ${diffX}px 100%, 0 calc(100% - ${diffY}px), 0 0)`
  }
}
