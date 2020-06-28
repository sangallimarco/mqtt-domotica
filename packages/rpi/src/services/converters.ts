import { isBoolean } from "lodash";
import { BinaryValue } from 'onoff';

export function booleanToBinaryValue(value: boolean): BinaryValue {
    return value ? 1 : 0
}

export function convertInput(value: string): BinaryValue {
    return isBoolean(value) ? booleanToBinaryValue(value) : booleanToBinaryValue(['1', 'on'].includes(value))
}

export function convertOutput(value: BinaryValue): string {
    return value === 1 ? 'on' : 'off'
}