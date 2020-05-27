"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToMQTT = exports.mqttClient = void 0;
var mqtt_1 = __importDefault(require("mqtt"));
exports.mqttClient = mqtt_1.default.connect(process.env.MQTT, {
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD
});
function addToMQTT(topic, value, postfix) {
    if (postfix === void 0) { postfix = '-series'; }
    exports.mqttClient.publish("topic" + postfix, value);
}
exports.addToMQTT = addToMQTT;
