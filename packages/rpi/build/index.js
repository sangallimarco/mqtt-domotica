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
const mqtt_1 = require("./services/mqtt");
const gpio_1 = require("./services/gpio");
dotenv_1.default.config();
console.log('Starting Worker', process.env.MQTT);
// init gpio
gpio_1.initPins();
mqtt_1.mqttClient.on('connect', () => {
    console.log('Connected');
    // subscribe to all topic
    const topics = mqtt_1.getCommandTopics();
    mqtt_1.mqttClient.subscribe(topics);
    mqtt_1.mqttClient.on('message', (topic, message) => __awaiter(void 0, void 0, void 0, function* () {
        const payload = message.toString();
        console.log('Processing Message', topic, payload);
        mqtt_1.processMQTTMessage(topic, payload);
    }));
    // TODO send status to a regular interval
});
mqtt_1.mqttClient.on('disconnect', () => {
    console.log('Disconnected');
});
