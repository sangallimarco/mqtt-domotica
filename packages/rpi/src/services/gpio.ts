import gpio from 'rpi-gpio'
import { INPUT, INPUT_PINS, OUTPUT, OUTPUT_PINS } from './types'
const gpioPromise = gpio.promise

export async function initPins(): Promise<boolean> {
    const promiseChain: Promise<any>[] = []

    OUTPUT_PINS.forEach((pin) => {
        promiseChain.push(gpioPromise.setup(pin, 'out'))
        promiseChain.push(gpioPromise.write(pin, false))
    })
    INPUT_PINS.forEach((pin) => {
        promiseChain.push(gpioPromise.setup(pin, 'in'))
    })

    await  Promise.all(promiseChain)
    return true
}

export async function writePin(pin: OUTPUT, status: boolean): Promise<unknown> {
    if (OUTPUT_PINS.includes(pin)) {
        return gpioPromise.write(pin, status)
    }
    return null
}

export async function readPin(pin: INPUT): Promise<boolean> {
    if (INPUT_PINS.includes(pin)) {
        return gpioPromise.read(pin)
    }
    return false
}

