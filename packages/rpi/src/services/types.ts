import { BinaryValue } from "onoff"

export enum GPIO_PIN {
    // outputs
    GPIO17 = 17,
    GPIO27 = 27,
    GPIO22 = 22,

    // inputs
    GPIO29 = 29,
    GPIO31 = 31
}

// https://pinout.xyz/
export type OUTPUT  = GPIO_PIN.GPIO17 | GPIO_PIN.GPIO27 | GPIO_PIN.GPIO22
export const OUTPUT_PINS = [GPIO_PIN.GPIO17, GPIO_PIN.GPIO27, GPIO_PIN.GPIO22]

export type INPUT  = GPIO_PIN.GPIO29 | GPIO_PIN.GPIO31
export const INPUT_PINS = [GPIO_PIN.GPIO29, GPIO_PIN.GPIO31]

export enum Direction {
    COMMAND = 'command',
    STATUS = 'status'
}

export type InputCallback = (input: GPIO_PIN, value: BinaryValue) => void