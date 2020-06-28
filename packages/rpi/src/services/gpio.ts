import { BinaryValue, Gpio } from 'onoff';
import { InputCallback, INPUT_PINS, OUTPUT, OUTPUT_PINS } from './types';

const INPUT_MAP = new Map(
    INPUT_PINS.map((pin) => {
        console.log('Setup Input', pin)
        return [pin, new Gpio(pin, 'in', 'rising', { debounceTimeout: 10 })]
    })
)

const OUTPUT_MAP = new Map(
    OUTPUT_PINS.map((pin) => {
        console.log('Setup Output', pin)
        return [pin, new Gpio(pin, 'out')]
    })
)

export function setInputsCallback(callback: InputCallback): void {
    INPUT_MAP.forEach((gpio, pin) => {
        gpio.watch((err, value) => {
            if (!err) {
                callback(pin, value)
            }
        })
    })
}

export function clearPins(): void {
    INPUT_MAP.forEach((input) => {
        input.unexport()
    })
    OUTPUT_MAP.forEach((output) => {
        output.unexport()
    })
}

export async function writePin(pin: OUTPUT, value: BinaryValue): Promise<unknown> {
    const output = OUTPUT_MAP.get(pin)
    if (output) {
        console.log('Set Pin', pin, status)
        return output.writeSync(value)
    }
    return null
}

