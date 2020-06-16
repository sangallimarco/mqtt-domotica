export enum TopicPartial {
    RELAY_COMMAND = 'relay/command',
    RELAY_STATUS = 'relay/status'
}

export enum GPIO_PIN {
    GPIO17 = 11,
    GPIO27 = 13,
    GPIO22 = 15,

    GPIO23 = 16,
    GPIO24 = 18
}

// https://pinout.xyz/
export type OUTPUT  = GPIO_PIN.GPIO17 | GPIO_PIN.GPIO27 | GPIO_PIN.GPIO22
export const OUTPUT_PINS = [GPIO_PIN.GPIO17, GPIO_PIN.GPIO27, GPIO_PIN.GPIO22]
export type INPUT  = GPIO_PIN.GPIO23 | GPIO_PIN.GPIO24
export const INPUT_PINS = [GPIO_PIN.GPIO23, GPIO_PIN.GPIO24]


export enum Direction {
    COMMAND = 'command',
    STATUS = 'status'
}