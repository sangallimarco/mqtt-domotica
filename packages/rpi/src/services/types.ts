export enum GPIO_PIN {
    GPIO17 = 11,
    GPIO27 = 13,
    GPIO22 = 15,

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