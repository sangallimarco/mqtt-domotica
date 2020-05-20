import { Decimal } from 'decimal.js'

export function numberToFixed(value: number, decimal: number = 2): string {
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
