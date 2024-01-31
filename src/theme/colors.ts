import { Colors } from './types'

const white = '#FFFFFF'
const black = '#000000'

export const linearGradient3 = 'linear-gradient(180.26deg, #272C43 0.23%, rgba(11, 13, 23, 0) 85.39%)'

function colors(darkMode: boolean): Colors {
  return {
    darkMode,
    // base
    white,
    black,

    // backgrounds / greys
    neutral8: darkMode ? '#141416' : '#141416',
    neutral7: darkMode ? '#23262F' : '#23262F',
    neutral6: darkMode ? '#353945' : '#353945',
    neutral5: darkMode ? '#777E90' : '#777E90',
    neutral4: darkMode ? '#B1B5C3' : '#B1B5C3',
    neutral3: darkMode ? '#E6E8EC' : '#E6E8EC',
    neutral2: darkMode ? '#F4F5F6' : '#F4F5F6',
    neutral1: darkMode ? '#FFFFFF' : '#FFFFFF',

    //primary colors
    primary1: '#B7ED1C',
    primary2: '#97CFFD',
    primary3: '#2F9EEE',

    second1: '#80AC01',

    // other
    red1: '#FA7B70',
    red2: '#FA5547',
    red3: '#BC2B1F',
    green1: '#38D060',
    green2: '#6DD488',
    green3: '#2B9948',
    orange1: '#FFC24B',
    orange2: '#FCEFD1',
    orange3: '#CB8D14',

    modalBG: darkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.3)',
    modalBG1: darkMode ? 'rgba(0, 0, 0, 0.85)' : 'rgba(0, 0, 0, 0.85)',

    background1: '#000000',
    background2: '#0A0B0D',
    background3: '#17181A',

    system1: '#F9344E',
    system2: '#15C578',
    system3: '#FFC403',

    stroke: '#333333',
  }
}

export const themeColors = colors(true)

export default colors

export type ColorsIndexType = keyof Omit<ReturnType<typeof colors>, 'darkMode'>
