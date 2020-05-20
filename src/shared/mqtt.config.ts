import { IClientOptions } from "mqtt"
import { isEmpty } from "lodash"

export const CONFIG_PATH = 'config'

export function getConfigOptions(): IClientOptions {
        const storedData = window.localStorage.getItem(CONFIG_PATH)
        return storedData ? JSON.parse(storedData) : {}
}

export function storeConfigOptions(options: IClientOptions): void {
        window.localStorage.setItem(CONFIG_PATH, JSON.stringify(options))
}

export function hasValidConfig() : boolean {
        return !isEmpty(getConfigOptions())
}
