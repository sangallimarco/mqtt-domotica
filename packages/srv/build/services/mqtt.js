'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.addToMQTT = exports.mqttClient = void 0
var mqtt_1 = __importDefault(require('mqtt'))
var dotenv_1 = __importDefault(require('dotenv'))
dotenv_1.default.config()
function getMQTTOptions() {
  console.log(process.env.MQTT_USERNAME, process.env.MQTT_PASSWORD)
  return process.env.MQTT_USERNAME && process.env.MQTT_PASSWORD
    ? {
        username: process.env.MQTT_USERNAME,
        password: process.env.MQTT_PASSWORD,
      }
    : {}
}
exports.mqttClient = mqtt_1.default.connect(process.env.MQTT, getMQTTOptions())
function addToMQTT(topic, value, postfix) {
  if (postfix === void 0) {
    postfix = '-time-series'
  }
  exports.mqttClient.publish('' + topic + postfix, value)
}
exports.addToMQTT = addToMQTT
