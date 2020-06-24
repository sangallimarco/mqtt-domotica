import gpio from 'rpi-gpio'
import { INPUT, INPUT_PINS, OUTPUT, OUTPUT_PINS } from './types'
const gpioPromise = gpio.promise

export async function initPins(): Promise<boolean> {
    OUTPUT_PINS.forEach(async (pin) => {
        console.log('Setup Output', pin)
        try {
            await gpioPromise.setup(pin, gpio.DIR_OUT)
        } catch (e) {
            console.error(e)
        }
    })
    INPUT_PINS.forEach(async (pin) => {
        console.log('Setup Input', pin)
        try {
            await gpioPromise.setup(pin, gpio.DIR_IN)
        } catch (e) {
            console.error(e)
        }
    })

    //TODO remove this one => there is an issue with rpi-gpio and setup
    await new Promise((resolve, reject) => setTimeout(() => resolve(true), 10000))

    OUTPUT_PINS.forEach(async (pin) => {
        console.log('Set Default Output Values', pin)
        try {
            await gpioPromise.write(pin, false)
        } catch (e) {
            console.error(e)
        }
    })

    return true
}

export async function writePin(pin: OUTPUT, status: boolean): Promise<unknown> {
    if (OUTPUT_PINS.includes(pin)) {
        console.log('Set Pin', pin, status)
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

