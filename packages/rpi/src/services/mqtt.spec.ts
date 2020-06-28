import { getMQTTPath } from "./mqtt"
import { GPIO_PIN, Direction } from "./types"

describe('mqtt', () => {
    describe('getMQTTPath',() => {
        test('shold return a valid path', () => {
            expect(getMQTTPath(GPIO_PIN.GPIO17, Direction.COMMAND)).toBe('')
        })
    })

})