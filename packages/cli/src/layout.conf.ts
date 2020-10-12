import { grommet } from 'grommet'
import { deepMerge } from 'grommet/utils'
import styled from 'styled-components'

// https://v2.grommet.io/color

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
}

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
}

export const themeColors = {
  brand: '#00739D',
  'neutral-1': '#00873D',
  'neutral-2': '#3D138D',
  'neutral-3': '#00739D',
  'neutral-4': '#A2423D',
  'accent-1': '#6FFFB0',
  'accent-2': '#FD6FFF',
  'accent-3': '#81FCED',
  'accent-4': '#FFCA58',
  'dark-1': '#333333',
  'dark-2': '#555555',
  'dark-3': '#777777',
  'dark-4': '#999999',
  'dark-5': '#999999',
  'dark-6': '#999999',
  'light-1': '#F8F8F8',
  'light-2': '#F2F2F2',
  'light-3': '#EDEDED',
  'light-4': '#DADADA',
  'light-5': '#DADADA',
  'light-6': '#DADADA',
  'status-critical': '#FF4040',
  'status-error': '#FF4040',
  'status-warning': '#FFAA15',
  'status-ok': '#00C781',
  'status-unknown': '#CCCCCC',
  'status-disabled': '#CCCCCC',
}

export const customTheme = deepMerge(grommet, {
  global: {
    font: {
      family: 'Roboto',
      size: '12px',
      height: '20px',
    },
    colors: {
      ...themeColors,
    },
    drop: {
      // background: { dark: 'dark-2', light: 'neutral-2' },
      border: { radius: '2em' },
      zIndex: '13',
      shadowSize: '1',
    },
    breakpoints: {
      xsmall: {
        value: 500,
      },
      small: {
        value: 1024,
      },
      medium: {
        value: 1800,
      },
      large: {
        value: 2000,
      },
    },
  },
})

export const LayoutGrid = styled.div`
  display: grid;
  grid-gap: 1em;
  grid-auto-rows: min-content;
  grid-template-columns: 1fr;

  @media ${device.laptop} {
    grid-template-columns: repeat(4, 1fr);
  }

  @media ${device.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${device.desktopL} {
    grid-template-columns: repeat(6, 1fr);
  }
`

export const MaxTemp = 60
export const MaxPower = 100
export const MaxQuality = 256
export const MaxEnergy = 50000
export const MinTemp = 10
export const MaxPercentage = 100
export const MaxADC = 1024

export const FloodDrainOnStatuses = ['flood', 'drain']
