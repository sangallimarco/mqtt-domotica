import {Decimal} from 'decimal.js';

export function stringToFixed(value: string, decimal: number = 2): number {
    try {
        const formatted =  new Decimal(value).toFixed(decimal);
        return Number(formatted);
    } catch(e) {
        return 0;
    }
}