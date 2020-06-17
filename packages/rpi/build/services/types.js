"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GPIO_PIN;
(function (GPIO_PIN) {
    GPIO_PIN[GPIO_PIN["GPIO17"] = 11] = "GPIO17";
    GPIO_PIN[GPIO_PIN["GPIO27"] = 13] = "GPIO27";
    GPIO_PIN[GPIO_PIN["GPIO22"] = 15] = "GPIO22";
    GPIO_PIN[GPIO_PIN["GPIO29"] = 29] = "GPIO29";
    GPIO_PIN[GPIO_PIN["GPIO31"] = 31] = "GPIO31";
})(GPIO_PIN = exports.GPIO_PIN || (exports.GPIO_PIN = {}));
exports.OUTPUT_PINS = [GPIO_PIN.GPIO17, GPIO_PIN.GPIO27, GPIO_PIN.GPIO22];
exports.INPUT_PINS = [GPIO_PIN.GPIO29, GPIO_PIN.GPIO31];
var Direction;
(function (Direction) {
    Direction["COMMAND"] = "command";
    Direction["STATUS"] = "status";
})(Direction = exports.Direction || (exports.Direction = {}));
