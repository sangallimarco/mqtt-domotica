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
const dotenv_1 = __importDefault(require("dotenv"));
const mqtt_1 = __importDefault(require("mqtt"));
const converters_1 = require("./converters");
const gpio_1 = require("./gpio");
const types_1 = require("./types");
exports.DEVICE_FAMILY = 'rpis';
dotenv_1.default.config();
function getMQTTOptions() {
    return process.env.MQTT_USERNAME && process.env.MQTT_PASSWORD
        ? {
            username: process.env.MQTT_USERNAME,
            password: process.env.MQTT_PASSWORD,
        }
        : {};
}
// connect to MQTT Broker
exports.mqttClient = mqtt_1.default.connect(process.env.MQTT, getMQTTOptions());
function getMQTTPath(pin, direction) {
    return `${exports.DEVICE_FAMILY}/${process.env.MQTT_ID}/${pin}/${direction}`;
}
exports.getMQTTPath = getMQTTPath;
function parseMQTTCommand(topic, value) {
    const parts = topic.split('/');
    if (parts.length === 4) {
        const direction = parts[3];
        if (direction === types_1.Direction.COMMAND) {
            return [parseInt(parts[2], 10), converters_1.convertInput(value)];
        }
    }
    return [-1, false];
}
exports.parseMQTTCommand = parseMQTTCommand;
function addMQTTMessage(pin, value) {
    const path = getMQTTPath(pin, types_1.Direction.STATUS);
    const covertedValue = converters_1.convertOutput(value);
    exports.mqttClient.publish(path, covertedValue, { qos: 0, retain: true });
}
exports.addMQTTMessage = addMQTTMessage;
function processMQTTMessage(topic, value) {
    return __awaiter(this, void 0, void 0, function* () {
        const [targetPin, convertedValue] = parseMQTTCommand(topic, value);
        console.log(targetPin, convertedValue);
        if (targetPin > 1) {
            yield gpio_1.writePin(targetPin, convertedValue);
            addMQTTMessage(targetPin, convertedValue);
        }
    });
}
exports.processMQTTMessage = processMQTTMessage;
function getCommandTopics() {
    return types_1.OUTPUT_PINS.map((pin) => getMQTTPath(pin, types_1.Direction.COMMAND));
}
exports.getCommandTopics = getCommandTopics;
