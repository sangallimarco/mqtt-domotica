import { grommet } from 'grommet'
import { deepMerge } from 'grommet/utils'
import styled from 'styled-components'

export const customTheme = deepMerge(grommet, {
  global: {
    font: {
      family: 'Roboto',
      size: '12px',
      height: '20px',
    },
    drop: {
      background: { dark: 'dark-2', light: 'neutral-2' },
      border: { radius: '2em' },
      zIndex: '13',
      shadowSize: '0',
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

export const MobileGrid = styled.div`
  display: grid;
  grid-gap: 1em;
  grid-auto-rows: min-content;
  grid-template-columns: 1fr;
`

export const TabletGrid = styled.div`
  display: grid;
  grid-gap: 1em;
  grid-auto-rows: min-content;
  grid-template-columns: repeat(2, 1fr);
`

export const DesktopGrid = styled.div`
  display: grid;
  grid-gap: 1em;
  grid-auto-rows: min-content;
  grid-template-columns: repeat(4, 1fr);
`

export const BigScreenGrid = styled.div`
  display: grid;
  grid-gap: 2em;
  grid-auto-rows: min-content;
  grid-template-columns: repeat(6, 1fr);
`


export const MaxTemp = 60
export const MaxPower = 100
export const MaxQuality = 256
export const MaxEnergy = 50000
export const MinTemp = 10
export const MaxPercentage = 100
export const MaxADC = 1024

export const FloodDrainOnStatuses = ['flood', 'drain'];
