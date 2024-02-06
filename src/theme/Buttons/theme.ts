import { generateClipPath } from 'utils/helpers/css'

import { sizes, variants } from './types'

export const styleVariants = {
  [variants.NORMAL]: {
    borderRadius: 0,
    color: 'neutral1',
    fontSize: '16px',
    bg: 'neutral7',
    borderColor: 'transparent',
    clipPath: generateClipPath({ diffX: 16, diffY: 8 }),
    transition: '0.3s',
    '&:hover:not(:disabled),&:active:not(:disabled)': {
      bg: 'neutral6',
      clipPath: generateClipPath({ diffX: 20, diffY: 10 }),
    },
  },
  [variants.PRIMARY]: {
    borderRadius: 0,
    color: 'neutral8',
    fontSize: '16px',
    bg: 'primary1',
    clipPath: generateClipPath({ diffX: 24, diffY: 12 }),
    transition: '0.3s',
    '&:hover:not(:disabled),&:active:not(:disabled)': {
      clipPath: generateClipPath({ diffX: 32, diffY: 16 }),
    },
  },
  [variants.LONG]: {
    borderRadius: 0,
    bg: 'system2',
    color: 'neutral8',
    fontSize: '16px',
    clipPath: generateClipPath({ diffX: 24, diffY: 12 }),
    transition: '0.3s',
    '&:hover:not(:disabled),&:active:not(:disabled)': {
      clipPath: generateClipPath({ diffX: 28, diffY: 14 }),
      filter: 'brightness(120%)',
    },
  },
  [variants.SHORT]: {
    borderRadius: 0,
    color: 'neutral1',
    fontSize: '16px',
    bg: 'system1',
    clipPath: generateClipPath({ diffX: 24, diffY: 12 }),
    transition: '0.3s',
    '&:hover:not(:disabled),&:active:not(:disabled)': {
      clipPath: generateClipPath({ diffX: 28, diffY: 14 }),
      filter: 'brightness(130%)',
    },
  },
  [variants.WHITE]: {
    color: 'neutral7',
    bg: 'neutral1',
    clipPath: generateClipPath({ diffX: 24, diffY: 12 }),
    transition: '0.3s',
    '&:hover:not(:disabled),&:active:not(:disabled)': {
      bg: 'neutral2',
      clipPath: generateClipPath({ diffX: 32, diffY: 16 }),
    },
  },
  [variants.INFO]: {
    color: 'neutral7',
    bg: 'neutral5',
    border: 'small',
    borderColor: 'neutral4',
    clipPath: generateClipPath({ diffX: 24, diffY: 12 }),
    transition: '0.3s',
    '&:hover:not(:disabled),&:active:not(:disabled)': {
      clipPath: generateClipPath({ diffX: 32, diffY: 16 }),
      bg: 'neutral4',
    },
  },
  [variants.WARNING]: {
    color: 'white',
    bg: 'warning1',
    clipPath: generateClipPath({ diffX: 24, diffY: 12 }),
    transition: '0.3s',
    '&:hover:not(:disabled),&:active:not(:disabled)': {
      clipPath: generateClipPath({ diffX: 32, diffY: 16 }),
      bg: 'warning2',
    },
  },
  [variants.SUCCESS]: {
    color: 'white',
    bg: 'success1',
    clipPath: generateClipPath({ diffX: 24, diffY: 12 }),
    transition: '0.3s',
    '&:hover:not(:disabled),&:active:not(:disabled)': {
      clipPath: generateClipPath({ diffX: 32, diffY: 16 }),
      bg: 'success2',
    },
  },
  [variants.DANGER]: {
    color: 'white',
    bg: 'red2',
    clipPath: generateClipPath({ diffX: 24, diffY: 12 }),
    transition: '0.3s',
    '&:hover:not(:disabled),&:active:not(:disabled)': {
      clipPath: generateClipPath({ diffX: 32, diffY: 16 }),
      bg: 'danger2',
    },
  },
  [variants.OUTLINE]: {
    color: 'neutral1',
    bg: 'transparent',
    border: 'small',
    borderColor: 'neutral3',
    clipPath: generateClipPath({ diffX: 24, diffY: 12 }),
    transition: '0.3s',
    '&:hover:not(:disabled),&:active:not(:disabled)': {
      clipPath: generateClipPath({ diffX: 32, diffY: 16 }),
      borderColor: 'neutral1',
    },
  },

  [variants.OUTLINE_DANGER]: {
    color: 'red2',
    bg: 'transparent',
    border: 'small',
    borderColor: 'neutral3',
    clipPath: generateClipPath({ diffX: 24, diffY: 12 }),
    transition: '0.3s',

    '&:hover:not(:disabled),&:active:not(:disabled)': {
      clipPath: generateClipPath({ diffX: 32, diffY: 16 }),

      borderColor: 'red2',
      color: 'red2',
    },
  },
  [variants.OUTLINE_PRIMARY]: {
    color: 'primary1',
    bg: 'transparent',
    border: 'small',
    borderColor: 'primary1',
    clipPath: generateClipPath({ diffX: 24, diffY: 12 }),
    transition: '0.3s',
    '&:hover:not(:disabled),&:active:not(:disabled)': {
      clipPath: generateClipPath({ diffX: 32, diffY: 16 }),
      borderColor: 'primary2',
      color: 'primary2',
    },
  },
  [variants.OUTLINE_ACTIVE]: {
    color: 'neutral1',
    bg: 'transparent',
    border: 'small',
    borderColor: 'neutral3',
    clipPath: generateClipPath({ diffX: 24, diffY: 12 }),
    transition: '0.3s',
    '&:hover:not(:disabled),&:active:not(:disabled)': {
      clipPath: generateClipPath({ diffX: 32, diffY: 16 }),
      borderColor: 'neutral2',
      color: 'neutral1',
    },
  },
  [variants.OUTLINE_INACTIVE]: {
    color: 'neutral2',
    bg: 'transparent',
    border: 'small',
    borderColor: 'neutral4',
    clipPath: generateClipPath({ diffX: 24, diffY: 12 }),
    transition: '0.3s',
    '&:hover:not(:disabled),&:active:not(:disabled)': {
      clipPath: generateClipPath({ diffX: 32, diffY: 16 }),
      borderColor: 'neutral3',
      color: 'neutral2',
    },
  },
  [variants.GHOST]: {
    color: 'neutral1',
    bg: 'transparent',
    border: 'none',
    p: 0,
    '&:hover:not(:disabled),&:active:not(:disabled)': {
      color: 'neutral2',
    },
  },
  [variants.GHOST_ACTIVE]: {
    color: 'neutral1',
    bg: 'transparent',
    border: 'none',
    p: 0,
    '&:hover:not(:disabled),&:active:not(:disabled)': {
      bg: 'neutral5',
      color: 'neutral1',
    },
  },
  [variants.GHOST_INACTIVE]: {
    color: 'neutral3',
    bg: 'transparent',
    border: 'none',
    p: 0,
    '&:hover:not(:disabled),&:active:not(:disabled)': {
      bg: 'neutral5',
      color: 'neutral1',
    },
  },
  [variants.GHOST_PRIMARY]: {
    color: 'primary1',
    bg: 'transparent',
    border: 'none',
    p: 0,
    '&:hover:not(:disabled),&:active:not(:disabled)': {
      color: 'primary2',
    },
  },
  [variants.GHOST_WARNING]: {
    color: 'orange1',
    bg: 'transparent',
    border: 'none',
    p: 0,
    '&:hover:not(:disabled),&:active:not(:disabled)': {
      color: 'orange2',
    },
  },
  [variants.GHOST_SUCCESS]: {
    color: 'green1',
    bg: 'transparent',
    border: 'none',
    '&:hover:not(:disabled),&:active:not(:disabled)': {
      color: 'green2',
    },
  },
  [variants.GHOST_DANGER]: {
    color: 'red2',
    bg: 'transparent',
    border: 'none',
    '&:hover:not(:disabled),&:active:not(:disabled)': {
      color: 'red1',
    },
  },
}

export const sizeVariants = {
  [sizes.ICON]: {
    p: 1,
    borderRadius: '50%',
    lineHeight: 'calc(100% - 4px)',
  },
  [sizes.XS]: {
    px: '8px',
    py: '4px',
    fontSize: '14px',
    borderRadius: '4px',
  },
  [sizes.SM]: {
    px: '12px',
    py: 2,
  },
  [sizes.MD]: {
    px: 3,
    py: 3,
  },
  [sizes.LG]: {
    px: '12px',
    py: 3,
    lineHeight: '16px',
    fontSize: '16px',
  },
}
