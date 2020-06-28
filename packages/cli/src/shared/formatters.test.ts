import {
  stringToBoolean,
  booleanToString,
  numberToFixed,
  stringToNumber,
  getMeterColor,
} from './formatters'

describe('Formatters', () => {
  describe('stringToBoolean()', () => {
    test('should convert a string into a bool', () => {
      expect(stringToBoolean('1')).toEqual(true)
      expect(stringToBoolean('0')).toEqual(false)
      expect(stringToBoolean('')).toEqual(false)
    })

    test('should convert a string into a bool (Shelly)', () => {
      expect(stringToBoolean('on')).toEqual(true)
      expect(stringToBoolean('off')).toEqual(false)
    })
  })

  describe('booleanToString()', () => {
    test('should a boolean into a string', () => {
      expect(booleanToString(true)).toEqual('1')
      expect(booleanToString(false)).toEqual('0')
    })

    test('should a boolean into a string (Shelly)', () => {
      expect(booleanToString(true, true)).toEqual('on')
      expect(booleanToString(false, true)).toEqual('off')
    })
  })

  describe('numberToFixed()', () => {
    test('should format a number into a fixed', () => {
      expect(numberToFixed(123.123123)).toEqual('123.12')
      expect(numberToFixed(2342.234234, 4)).toEqual('2342.2342')
      expect(numberToFixed(0)).toEqual('0.00')
    })
  })

  describe('stringToNumber()', () => {
    test('should convert a string in a number', () => {
      expect(stringToNumber('123.2323')).toEqual(123.2323)
      expect(stringToNumber('')).toEqual(0)
    })
  })

  describe('getMeterColor()', () => {
    test('should get color code', () => {
      expect(getMeterColor(12, 100)).toEqual('status-ok')
      expect(getMeterColor(34, 100)).toEqual('status-warning')
      expect(getMeterColor(70, 100)).toEqual('status-critical')
    })
  })
})