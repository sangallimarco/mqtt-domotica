import { GridProps, grommet } from 'grommet'
import { deepMerge } from 'grommet/utils'

export enum AreaName {
    HEADER = 'HEADER',
    PUMPS_SWITCH = 'PUMPS_SWITCH',
    NETWORK = 'NETWORK',
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
    CAM = 'CAM'
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
                value: 500
            },
            small: {
                value: 1024
            },
            medium: {
                value: 1800
            },
            large: {
                value: 2000
            }
        }
    },
})


export const DesktopGrid: GridProps = {
    rows: Array(8).fill('min-content'),
    columns: ['1fr', '1fr', '1fr'],
    areas: [
        { name: AreaName.HEADER, start: [0, 0], end: [3, 0] },

        { name: AreaName.PUMPS_SWITCH, start: [0, 1], end: [1, 1] },
        { name: AreaName.NETWORK, start: [1, 1], end: [2, 1] },
        { name: AreaName.PROCESS_SWITCH, start: [2, 1], end: [3, 1] },

        { name: AreaName.TEMP1, start: [0, 2], end: [1, 2] },
        { name: AreaName.TEMP2, start: [1, 2], end: [2, 2] },
        { name: AreaName.POWER, start: [2, 2], end: [3, 2] },

        { name: AreaName.HEADER_OUTDOOR, start: [0, 3], end: [3, 3] },

        { name: AreaName.OUTDOOR_PUMP_SWITCH, start: [0, 4], end: [1, 4] },
        { name: AreaName.OUTDOOR_FUTURE1, start: [1, 4], end: [2, 4] },
        { name: AreaName.OUTDOOR_FUTURE2, start: [2, 4], end: [3, 4] },

        { name: AreaName.OUTDOOR_PUMP_POWER, start: [0, 5], end: [1, 5] },
        { name: AreaName.OUTDOOR_PUMP_TEMP, start: [1, 5], end: [2, 5] },
        { name: AreaName.OUTDOOR_PUMP_ENERGY, start: [2, 5], end: [3, 5] },

        { name: AreaName.HEADER_CAM, start: [0, 6], end: [3, 6] },
        { name: AreaName.CAM, start: [0, 7], end: [3, 7] }
    ]
}

export const MobileGrid: GridProps = {
    rows: Array(14).fill('min-content'),
    columns: ['1fr','1fr'],
    areas: [
        { name: AreaName.HEADER, start: [0, 0], end: [1, 0] },
        { name: AreaName.NETWORK, start: [1, 0], end: [2, 0] },

        { name: AreaName.PUMPS_SWITCH, start: [0, 1], end: [1, 1] },
        { name: AreaName.PROCESS_SWITCH, start: [1, 1], end: [2, 1] },

        { name: AreaName.TEMP1, start: [0, 2], end: [2, 2] },
        { name: AreaName.TEMP2, start: [0, 3], end: [2, 3] },
        { name: AreaName.POWER, start: [0, 4], end: [2, 4] },

        { name: AreaName.HEADER_OUTDOOR, start: [0, 5], end: [2, 5] },

        { name: AreaName.OUTDOOR_PUMP_SWITCH, start: [0, 6], end: [2, 6] },
        { name: AreaName.OUTDOOR_FUTURE1, start: [0, 7], end: [2, 7] },
        { name: AreaName.OUTDOOR_FUTURE2, start: [0, 8], end: [2, 8] },

        { name: AreaName.OUTDOOR_PUMP_POWER, start: [0, 9], end: [2, 9] },
        { name: AreaName.OUTDOOR_PUMP_TEMP, start: [0, 10], end: [2, 10] },
        { name: AreaName.OUTDOOR_PUMP_ENERGY, start: [0, 11], end: [2, 11] },

        { name: AreaName.HEADER_CAM, start: [0, 12], end: [2, 12] },

        { name: AreaName.CAM, start: [0, 13], end: [2, 13] }
    ]
}

export function getLayourConfig(size: number): GridProps {
    return size < 750 ? MobileGrid : DesktopGrid
}

export const MaxTemp = 40
export const MaxPower = 100