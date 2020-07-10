import { grommet } from 'grommet'
import { deepMerge } from 'grommet/utils'
import styled from 'styled-components'

export enum AreaName {
  HEADER = 'HEADER',
  PUMPS_SWITCH = 'PUMPS_SWITCH',
  LIGHT_SWITCH = 'LIGHT_SWITCH',
  PROCESS_SWITCH = 'PROCESS_SWITCH',
  TEMP1 = 'TEMP1',
  TEMP2 = 'TEMP2',
  POWER = 'POWER',
  HEADER_OUTDOOR = 'HEADER_OUTDOOR',
  OUTDOOR_PUMP_SWITCH = 'OUTDOOR_PUMP_SWITCH',
  OUTDOOR_FUTURE1 = 'OUTDOOR_FUTURE1',
  OUTDOOR_FUTURE2 = 'OUTDOOR_FUTURE2',
  OUTDOOR_PUMP_POWER = 'OUTDOOR_PUMP_POWER',
  OUTDOOR_PUMP_TEMP = 'OUTDOOR_PUMP_TEMP',
  OUTDOOR_PUMP_ENERGY = 'OUTDOOR_PUMP_ENERGY',
  HEADER_CAM = 'HEADER_CAM',
  CAM = 'CAM',
}

export const customTheme = deepMerge(grommet, {
  global: {
    font: {
      family: 'Roboto',
      size: '14px',
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
  grid-template-columns: repeat(5, 1fr);
`

export const MaxTemp = 60
export const MaxPower = 100
export const MaxEnergy = 50000
export const MinTemp = 10
