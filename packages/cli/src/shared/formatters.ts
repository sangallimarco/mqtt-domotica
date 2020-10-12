import { Decimal } from 'decimal.js'
import { isEmpty } from 'lodash'
import { TimeSeries } from './mqtt.types'

export function numberToFixed(
  value: number | string,
  decimal: number = 2
): string {
  try {
    return new Decimal(value).toFixed(decimal)
  } catch (e) {
    return '0'
  }
}

export function stringToNumber(value: string): number {
  if (value && value.length > 0) {
    return Number(value)
  }
  return 0
}

export function stringToBoolean(value: string): boolean {
  if (value && value.length > 0) {
    return ['1', 'on'].includes(value)
  }
  return false
}

export function booleanToString(value: boolean, shellyMode = false): string {
  if (shellyMode) {
    return value ? 'on' : 'off'
  } else {
    return value ? '1' : '0'
  }
}

export function getMeterColor(value: number, max: number): string {
  const k = max / 3
  if (value > k * 2) {
    return 'status-critical'
  } else if (value > k) {
    return 'status-warning'
  }
  return 'status-ok'
}

export interface TimeSeriesData {
  xBounds: number[]
  yBounds: number[]
  values: number[][]
}

export function stringToTimeSeries(value: string): TimeSeriesData {
  let xBounds = [-Infinity, Infinity]
  let yBounds = [-Infinity, Infinity]
  let values = []

  if (value && value.length > 0) {
    let result = []
    try {
      result = JSON.parse(value)
    } catch (e) {
      //
    }

    values = result
      .map((item: TimeSeries, index: number) => {
        const [timestamp, itemValue] = item
        const ts = parseInt(timestamp, 10)
        let value = 0

        try {
          value = new Decimal(itemValue).toDecimalPlaces(1).toNumber()
        } catch (e) {
          return []
        }

        // first element as index
        if (xBounds[0] === -Infinity) {
          yBounds = [value, value]
          xBounds = [ts, ts]
        } else {
          xBounds = getBounds(ts, xBounds)
          yBounds = getBounds(value, yBounds)
        }

        return [ts, value]
      })
      .filter((tuple: number[]) => !isEmpty(tuple))
  }

  return {
    xBounds,
    yBounds,
    values,
  }
}

export function getBounds(value: number, bounds: number[]): number[] {
  const [low = -Infinity, high = Infinity] = bounds
  const newBounds = [low, high]

  if (value > newBounds[1]) {
    newBounds[1] = value
  } else if (value < newBounds[0]) {
    newBounds[0] = value
  }

  return newBounds
}
