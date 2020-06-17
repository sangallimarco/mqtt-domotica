"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function convertInput(value) {
    return lodash_1.isBoolean(value) ? value : ['1', 'on'].includes(value);
}
exports.convertInput = convertInput;
function convertOutput(value) {
    const status = lodash_1.isBoolean(value) ? value : ['1', 'on'].includes(value);
    return status ? 'on' : 'off';
}
exports.convertOutput = convertOutput;
