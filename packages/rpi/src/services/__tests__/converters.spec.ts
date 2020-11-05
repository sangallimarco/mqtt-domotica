import { convertInput, convertOutput } from "../converters"

describe('converters', () => {
    describe('convertInput',() => {
        test('should convert string to BinaryValue', () => {
            expect(convertInput('1')).toBe(1)
            expect(convertInput('on')).toBe(1)
            expect(convertInput('0')).toBe(0)
            expect(convertInput('off')).toBe(0)
        })
    })

    describe('convertOutput',() => {
        test('should convert BinaryValue to string', () => {
            expect(convertOutput(0)).toBe('off')
            expect(convertOutput(1)).toBe('on')
        })
    })
})