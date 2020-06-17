"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rpi_gpio_1 = __importDefault(require("rpi-gpio"));
const types_1 = require("./types");
const gpioPromise = rpi_gpio_1.default.promise;
function initPins() {
    return __awaiter(this, void 0, void 0, function* () {
        types_1.OUTPUT_PINS.forEach((pin) => __awaiter(this, void 0, void 0, function* () {
            console.log('Setup Output', pin);
            yield gpioPromise.setup(pin, rpi_gpio_1.default.DIR_OUT);
        }));
        types_1.INPUT_PINS.forEach((pin) => __awaiter(this, void 0, void 0, function* () {
            console.log('Setup Input', pin);
            yield gpioPromise.setup(pin, rpi_gpio_1.default.DIR_IN);
        }));
        //TODO remove this one => there is an issue with rpi-gpio and setup
        yield new Promise((resolve, reject) => setTimeout(() => resolve(true), 10000));
        types_1.OUTPUT_PINS.forEach((pin) => __awaiter(this, void 0, void 0, function* () {
            console.log('Set Default Output Values', pin);
            yield gpioPromise.write(pin, false);
        }));
        return true;
    });
}
exports.initPins = initPins;
function writePin(pin, status) {
    return __awaiter(this, void 0, void 0, function* () {
        if (types_1.OUTPUT_PINS.includes(pin)) {
            console.log('Set Pin', pin, status);
            return gpioPromise.write(pin, status);
        }
        return null;
    });
}
exports.writePin = writePin;
function readPin(pin) {
    return __awaiter(this, void 0, void 0, function* () {
        if (types_1.INPUT_PINS.includes(pin)) {
            return gpioPromise.read(pin);
        }
        return false;
    });
}
exports.readPin = readPin;
