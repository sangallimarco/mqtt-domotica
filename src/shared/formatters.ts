import {Decimal} from 'decimal.js';

export function numberToFixed(value: number, decimal: number = 2): string {
    try {
       return  new Decimal(value).toFixed(decimal);
    } catch(e) {
        return '0';
    }
}

export function stringToNumber(value: string): number {
    if (value && value.length > 0) {
        return Number(value);
    }
    return 0;
}

export function stringToBoolean(value: string): boolean {
    if (value && value.length > 0) {
        return value === '1';
    }
    return false;
}

export function booleanToString(value: boolean): string {
    return value ? '1' : '0';
}