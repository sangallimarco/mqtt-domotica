import { isBoolean } from "lodash"

export function convertInput(value: string): boolean {
    return isBoolean(value) ? value : ['1', 'on'].includes(value)
}

export function convertOutput(value: string | boolean): string {
    const status = isBoolean(value) ? value : ['1', 'on'].includes(value)
    return status ? 'on' : 'off'
}